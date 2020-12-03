import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/categories-screen";
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
  onAddCategory: (parentCategoryId?: string) => void;
  onSelectCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onSaveCategories: () => void;
  onDeleteCategory: (category: Category) => void;
}

/**
 * Functional component for categories view
 */
const CategoriesScreen: React.FC<Props> = ({
  treeData,
  selectedCategory,
  openCategories,
  classes,
  onAddCategory,
  onSelectCategory,
  onUpdateCategory,
  onSaveCategories,
  onDeleteCategory
}) => {

  /**
   * Construct display tree data
   *
   * @returns returns sortable tree item list
   */
  const constructTreeData = (): TreeItemSortable[] => {
    if (!treeData) {
      return [];
    }
    return constructSingleLevel(treeData);
  };

  /**
   * Recursive function that construct single level of the tree
   *
   * @param level current level
   * @returns returns sortable tree item list
   */
  const constructSingleLevel = (level: CategoryDataHolder[]): TreeItemSortable[] => {
    return level.map(categoryData => {
      const { category, childCategories } = categoryData;
      return {
        id: category.id,
        category: category,
        expanded: openCategories.includes(category.id!!),
        title: (
          <GenericTreeItem
            category={ category }
            onAddCategoryClick={ onAddCategory }
            onClick={ onSelectCategory }
            onDeleteClick={ onDeleteCategory }
            hasChildElements={ childCategories.length > 0 }
          />
          ),
        children: childCategories.length > 0 ?
          constructSingleLevel(childCategories) :
          []
      } as TreeItemSortable;
    });
  };

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <div className={ classes.treeContainer }>
        <div className={ classes.actionButtonContainer }>
          <GenericButton
            onClick={ () => onAddCategory() }
            text={ strings.categories.addCategory }
            style={{
              backgroundColor: "#00B6ED",
              marginTop: 10,
              marginLeft: 10
            }}
          />
          <GenericButton
            onClick={ () => onSaveCategories() }
            text={ strings.generic.save }
            style={{
              backgroundColor: "#00B6ED",
              marginTop: 10,
              marginLeft: 10
            }}
          />
        </div>
        <SortableTree
          treeData={ constructTreeData() }
          onVisibilityToggle={ data => onSelectCategory(data.node.category) }
          
          /**
           * TODO: Add logic for changing order
           */
          onChange={ data => console.log(data) }
        />
      </div>
      <div className={ classes.propertiesContainer }>
        { selectedCategory &&
          <PropertiesPanel
            category={ selectedCategory }
            onCategoryUpdate={ onUpdateCategory }
          />
        }
      </div>
    </div>
  );
};

export default withStyles(styles)(CategoriesScreen);