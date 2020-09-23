import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/categories-screen";
import {  Category } from "../../generated/client";
import { AccessToken, CategoryDataHolder } from "../../types";
import Api from "../../api/api";
import { KeycloakInstance } from "keycloak-js";
import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";
import CategoriesScreen from "./categories-screen";
import { constructTreeData } from "../../utils/tree-data-utils";
import { produce } from "immer";
import { askConfirmation } from "../../utils/generic-utils";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  accessToken: AccessToken;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  categories: Category[];
  selectedCategory?: Category;
  openCategories: string[];
  modifiedCategories: Category[];
  treeData?: CategoryDataHolder[];
}

/**
 * Class component for category data provider
 */
class CategoriesProvider extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
      openCategories: [],
      modifiedCategories: []
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = () => {
    this.listCategories()
    .then(categories => this.updateCategoryData(categories))
    .catch(error => console.log(error));
  }

  /**
   * Component render
   */
  public render = () => {
    const {
      selectedCategory,
      openCategories,
      treeData,
    } = this.state;

    return (
      <CategoriesScreen
        selectedCategory={ selectedCategory }
        openCategories={ openCategories }
        treeData={ treeData }
        onAddCategoryClick={ this.onAddCategoryClick }
        onCategoryClick={ this.onCategoryClick }
        onCategoryUpdate={ this.onCategoryUpdate }
        onCategorySaveClick={ this.updateChangedCategories }
        onCategoryDeleteClick={ this.onCategoryDeleteClick }
      />
    );
  }

  /**
   * Create category to DB
   *
   * @param parentCategoryId parent category ID
   */
  private onAddCategoryClick = (parentCategoryId?: string) => {
    const { categories } = this.state;

    const newCategory: Category = {
      name: "New category",
      parentCategoryId: parentCategoryId
    };

    this.createCategory(newCategory)
    .then(createdCategory => this.updateCategoryData(addOrUpdateList(categories, createdCategory), createdCategory))
    .catch(error => console.log(error));

  };

  /**
   * Event handler for category click
   *
   * @param clickedCategory clicked category
   */
  private onCategoryClick = async (clickedCategory: Category) => {
    const { openCategories } = this.state;

    this.setState({
      openCategories: updateOpenedCategories(openCategories, clickedCategory),
      selectedCategory: clickedCategory
    });
  }

  /**
   * Update category to DB
   *
   * @param categoryToUpdate category to update
   */
  private onCategoryUpdate = async (categoryToUpdate: Category) => {
    const { categories } = this.state;

    if (!categoryToUpdate.id) {
      return;
    }

    this.setState({
      modifiedCategories: addOrUpdateList(categories, categoryToUpdate)
    });
  };


  /**
   * Update changed categories state
   */
  private updateChangedCategories = () => {
    const { modifiedCategories } = this.state;
    if (!modifiedCategories) {
      return;
    }

    modifiedCategories.forEach(category => {
      this.updateCategory(category);
    });
  };

  /**
   * Event handler for category delete click
   *
   * @param categoryToDelete category to delete 
   */
  private onCategoryDeleteClick = (categoryToDelete: Category) => {
    const { categories, modifiedCategories } = this.state;

    if (askConfirmation()) {
      this.updateCategoryData(categories.filter(category => category.id !== categoryToDelete.id));
      this.setState({
        modifiedCategories: modifiedCategories.filter(category => category.id !== categoryToDelete.id)
      });
      this.deleteCategory(categoryToDelete)
      .catch(error => console.log(error));
    }
  }

  /**
   * Get category data form API
   *
   * @param accessToken keycloak access token
   */
  private listCategories = async (): Promise<Category[]> => {
    const { accessToken } = this.props;

    const categoriesApi = Api.getCategoriesApi(accessToken);
    return await categoriesApi.listCategories({ });
  };

  /**
   * Create category to DB
   *
   * @param newCategory category to be created
   * @returns promise with type Category
   */
  private createCategory = async (newCategory: Category): Promise<Category> => {
    const { accessToken } = this.props;

    const categoriesApi = Api.getCategoriesApi(accessToken);
    return await categoriesApi.createCategory({
      category: newCategory
    });
  }

  /**
   * Update category data
   *
   * @param updatedCategoryList list of updated categories
   * @param selectedCategory selected category
   */
  private updateCategoryData = (updatedCategoryList: Category[], selectedCategory?: Category) => {
    const treeData = constructTreeData(updatedCategoryList);

    this.setState({
      categories: updatedCategoryList,
      treeData: treeData,
      selectedCategory: selectedCategory
    });
  };

  /**
   * Update category to DB
   *
   * @param categoryToUpdate category to update
   */
  private updateCategory = async (categoryToUpdate: Category) => {
    const { accessToken } = this.props;

    if (!categoryToUpdate.id) {
      return;
    }

    const categoriesApi = Api.getCategoriesApi(accessToken);
    await categoriesApi.updateCategory({
      categoryId: categoryToUpdate.id,
      category: categoryToUpdate
    });
  };

  /**
   * Delete category from DB
   *
   * @param accessToken keycloak access token
   * @param categoryToDelete category to delete
   */
  private deleteCategory = async (categoryToDelete: Category): Promise<void> => {
    const { accessToken } = this.props;

    const categoriesApi = Api.getCategoriesApi(accessToken);
    return await categoriesApi.deleteCategory({
      categoryId: categoryToDelete.id!!
    });
  };
}

/**
 * Update opened categories list
 *
 * @param openCategories currently opened categories
 * @param clickedCategory category to be opened/closed
 * @returns list of opened categories
 */
const updateOpenedCategories = (openCategories: string[], clickedCategory: Category): string[] => {
  if (!clickedCategory.id) {
    return openCategories;
  }

  if (openCategories.includes(clickedCategory.id)) {
    return openCategories.filter(id => id !== clickedCategory.id);
  } else {
    return [ ...openCategories || [], clickedCategory.id!!];
  }
};

/**
 * Add or update list
 *
 * @param itemList old list to be updated
 * @param newItem new category to be added or updated
 * @returns updated list of categories
 */
const addOrUpdateList = (categories: Category[], newCategory: Category): Category[] => {
  return produce(categories, draft => {
    const index = categories.findIndex(category => category.id === newCategory.id);
    if (index > -1) {
      draft.splice(index, 1, newCategory);
    } else {
      draft.push(newCategory);
    }
  });
};

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    keycloak: state.auth.keycloak as KeycloakInstance,
    accessToken: state.auth.accessToken as AccessToken,
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: React.Dispatch<ReduxActions>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoriesProvider));