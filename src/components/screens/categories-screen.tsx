import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/categories-screen";
import AppLayout from "../layouts/app-layout";
import { Category } from "../../generated/client";
import strings from "../../localization/strings";
import SortableTree, { TreeItem as TreeItemSortable } from "react-sortable-tree";
import GenericTreeItem from "../generic/generic-tree-item";
import 'react-sortable-tree/style.css';
import { CategoryDataHolder } from "../../types";
import PropertiesPanel from "../categories/properties-panel";
import GenericButton from "../generic/generic-button";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  selectedCategory?: Category;
  openCategories: string[];
  treeData?: CategoryDataHolder[];
  onAddCategoryClick: (parentCategoryId?: string) => void;
  onCategoryClick: (category: Category) => void;
  onCategoryUpdate: (category: Category) => void;
  onCategorySaveClick: () => void;
  onCategoryDeleteClick: (category: Category) => void;
}

/**
 * Functional component for categories view
 */
const CategoriesScreen: React.FC<Props> = props => {
  const { selectedCategory, classes, onAddCategoryClick, onCategoryUpdate, onCategorySaveClick } = props;

  return (
    <AppLayout
      headerProps={{
        onSaveClick: onCategorySaveClick
      }}
    >
      <div className={ classes.treeContainer }>
        <GenericButton
          onClick={ () => onAddCategoryClick() }
          text={ strings.categories.addCategory }
          style={{
            backgroundColor: "#00B6ED",
            marginTop: 10,
            marginLeft: 10
          }}
        />
        <SortableTree
          treeData={ constructTreeData(props) }
          /**
           * TODO: Add logic for changing order
           */
          onChange={ data => console.log(data) }
        />
      </div>
      <div className={ classes.dataContainer }>
        { selectedCategory &&
          <PropertiesPanel
            category={ selectedCategory }
            onCategoryUpdate={ onCategoryUpdate }
          />
        }
      </div>
    </AppLayout>
  );
};

/**
 * Construct display tree data
 *
 * @param props component props
 * @returns returns sortable tree item list
 */
const constructTreeData = (props: Props): TreeItemSortable[] => {
  const { treeData } = props;

  if (!treeData) {
    return [];
  }
  return constructSingleLevel(treeData, props);
};

/**
 * Recursive function that construct single level of the tree
 *
 * @param treeData current tree data
 * @param props component props
 * @returns returns sortable tree item list
 */
const constructSingleLevel = (treeData: CategoryDataHolder[], props: Props): TreeItemSortable[] => {
  const { openCategories, onAddCategoryClick, onCategoryClick, onCategoryDeleteClick } = props;
  return treeData.map(categoryData => {
    const { category, childCategories } = categoryData;
    return {
      id: category.id,
      expanded: openCategories.includes(category.id!!),
      title: (
        <GenericTreeItem
          category={ category }
          onAddCategoryClick={ onAddCategoryClick }
          onClick={ onCategoryClick }
          onDeleteClick={ onCategoryDeleteClick }
          hasChildElements={ childCategories.length > 0 }
        />
        ),
      children: childCategories.length > 0 ?
        constructSingleLevel(childCategories, props) :
        []
    } as TreeItemSortable;
  });
};

export default withStyles(styles)(CategoriesScreen);