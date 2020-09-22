import * as React from "react";

import { WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/categories-screen";
import { useState } from "react";
import {  Category } from "../../generated/client";
import { useEffect } from "react";
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
 * Functional component for categories view
 *
 * @param props component props
 */
const CategoriesProvider: React.FC<Props> = props => {

  const { accessToken } = props;
  const [ stateCategories, setCategories ] = useState<Category[]>([]);
  const [ selectedCategory, setSelectedCategory ] = useState<Category | undefined>(undefined);
  const [ openCategories, setOpenCategory ] = useState<string[]>([]);
  const [ modifiedCategories, setModifiedCategories ] = useState<Category[]>([]);
  const [ treeData, setTreeData ] = useState<CategoryDataHolder[] | undefined>(undefined);

  /**
   * Initialize categories and tree data
   */
  const initializeCategories = async () => {
    listCategoryData(accessToken)
    .then(allCategories => updateData(allCategories))
    .catch(error => console.log(error));
  };

  /**
   * Event handler for add category click
   *
   * @param parentCategoryId parent category ID
   */
  const onAddCategoryClick = async (parentCategoryId?: string) => {
    createCategory(accessToken, parentCategoryId)
    .then(createdCategory => updateData([ ...stateCategories || [], createdCategory ]))
    .catch(error => console.log(error));
  };

  /**
   * Update category data
   *
   * @param categories list of updated categories
   */
  const updateData = (updatedCategoryList: Category[], newSelectedCategory?: Category) => {
    setCategories(updatedCategoryList);
    const initializedTreeData = constructTreeData(accessToken, updatedCategoryList);
    setTreeData(initializedTreeData);
    setSelectedCategory(newSelectedCategory);
  };

  /**
   * Update changed categories state
   */
  const updateChangedCategories = () => {
    modifiedCategories.forEach(category => {
      updateCategory(accessToken, category);
    });
  };

  /**
   * Initialize data when component mounts
   */
  useEffect(() => {
    if (stateCategories.length === 0) {
      initializeCategories();
    }
  });

  return (
    <CategoriesScreen
      selectedCategory={ selectedCategory }
      openCategories={ openCategories }
      treeData={ treeData }
      onAddCategoryClick={ onAddCategoryClick }
      onCategoryClick={
        category => {
          setSelectedCategory(category);
          setOpenCategory(updateOpenedCategories(openCategories, category));
        }
      }
      onCategoryUpdate={
        category => {
          updateData(addOrUpdateList(stateCategories, category), category);
          setModifiedCategories(addOrUpdateList(modifiedCategories, category));
        }
      }
      onCategorySaveClick={ updateChangedCategories }
      onCategoryDeleteClick={
        categoryToDelete => {
          if (askConfirmation()) {
            updateData(stateCategories.filter(category => category.id !== categoryToDelete.id));
            setModifiedCategories(modifiedCategories.filter(category => category.id !== categoryToDelete.id));
            deleteCategory(accessToken, categoryToDelete);
          }
        }
      }
    />
  );
};

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
const addOrUpdateList = (list: Category[], newItem: Category): Category[] => {
  return produce(list, draft => {
    const index = list.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      draft.splice(index, 1, newItem);
    } else {
      draft.push(newItem);
    }
  });
};

/**
 * Get category data form API
 *
 * @param accessToken keycloak access token
 */
const listCategoryData = async (accessToken: AccessToken) => {
  const categoriesApi = Api.getCategoriesApi(accessToken);
  return await categoriesApi.listCategories({ });
};

/**
 * Create category to DB
 *
 * @param accessToken keycloak access token
 * @param parentCategoryId parent category ID
 */
const createCategory = async (accessToken: AccessToken, parentCategoryId?: string) => {
  const newCategory: Category = {
    name: "New category",
    parentCategoryId: parentCategoryId
  };

  const categoriesApi = Api.getCategoriesApi(accessToken);
  return await categoriesApi.createCategory({
    category: newCategory
  });
};

/**
 * Update category to DB
 *
 * @param accessToken keycloak access token
 * @param categoryToUpdate category to update
 */
const updateCategory = async (accessToken: AccessToken, categoryToUpdate: Category) => {
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
const deleteCategory = async (accessToken: AccessToken, categoryToDelete: Category) => {
  if (!categoryToDelete.id) {
    return;
  }

  const categoriesApi = Api.getCategoriesApi(accessToken);
  await categoriesApi.deleteCategory({
    categoryId: categoryToDelete.id
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