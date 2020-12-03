import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/categories/categories-editor";
import {  Category } from "../../generated/client";
import { AccessToken, CategoryDataHolder } from "../../types";
import Api from "../../api/api";
import CategoriesEditor from "./categories-editor";
import { TreeDataUtils } from "../../utils/tree-data-utils";
import { produce } from "immer";
import { askConfirmation } from "../../utils/generic-utils";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
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
      <CategoriesEditor
        selectedCategory={ selectedCategory }
        openCategories={ openCategories }
        treeData={ treeData }
        onAddCategory={ this.onAddCategoryClick }
        onSelectCategory={ this.onCategoryClick }
        onUpdateCategory={ this.onCategoryUpdate }
        onSaveCategories={ this.updateChangedCategories }
        onDeleteCategory={ this.onCategoryDeleteClick }
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
    .then(createdCategory => {
      if (createdCategory) {
        this.updateCategoryData(addOrUpdateList(categories, createdCategory), createdCategory);
      }
    })
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
      modifiedCategories: addOrUpdateList(categories, categoryToUpdate),
      selectedCategory: categoryToUpdate
    });
  };

  /**
   * Update changed categories state
   */
  private updateChangedCategories = async () => {
    const { categories, modifiedCategories } = this.state;
    if (!modifiedCategories) {
      return;
    }

    const updatedCategories = await Promise.all(
      modifiedCategories.map(category => this.updateCategory(category))
    );

    this.updateCategoryData(
      categories.map(category => {
        const index = updatedCategories.findIndex(updatedCategory => updatedCategory?.id === category.id);
        return index > -1 ?
          updatedCategories[index]! : category;
      }),
      this.state.selectedCategory
    );
  };

  /**
   * Event handler for category delete click
   *
   * @param categoryToDelete category to delete 
   */
  private onCategoryDeleteClick = (categoryToDelete: Category) => {
    const { categories, modifiedCategories } = this.state;

    if (!this.props.signedToken) {
      return;
    }

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
    const { signedToken } = this.props;

    if (!signedToken) {
      return Promise.reject("No signed token");
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
    return await categoriesApi.listCategories({ });
  };

  /**
   * Create category to DB
   *
   * @param newCategory category to be created
   * @returns promise with type Category
   */
  private createCategory = async (newCategory: Category): Promise<Category> => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return Promise.reject("No signed token");
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
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
  const treeData = TreeDataUtils.constructTreeData(updatedCategoryList);

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
    const { signedToken } = this.props;

    if (!signedToken || !categoryToUpdate.id) {
      return;
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
    return await categoriesApi.updateCategory({
      categoryId: categoryToUpdate.id,
      category: categoryToUpdate
    });
  };

  /**
   * Delete category from DB
   *
   * @param categoryToDelete category to delete
   */
  private deleteCategory = async (categoryToDelete: Category): Promise<void> => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return;
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
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
 * @param categories categories list
 * @param newCategory new category to be added or updated
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

export default withStyles(styles)(CategoriesProvider);