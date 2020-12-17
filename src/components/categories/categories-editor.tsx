import * as React from "react";

import { withStyles, WithStyles, Toolbar, Button } from "@material-ui/core";
import styles from "../../styles/components/categories/categories-editor";
import { Category } from "../../generated/client";
import strings from "../../localization/strings";
import SortableTree, { TreeItem as TreeItemSortable } from "react-sortable-tree";
import GenericTreeItem from "../generic/generic-tree-item";
import "react-sortable-tree/style.css";
import { CategoryDataHolder } from "../../types";
import PropertiesPanel from "./properties-panel";
import GenericButton from "../generic/generic-button";
import AddIcon from "@material-ui/icons/AddCircle";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  selectedCategory?: Category;
  openCategories: string[];
  treeData?: CategoryDataHolder[];
  onAddCategory: (parentCategory?: Category) => void;
  onSelectCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onUpdateCategoryOrder: (category: Category, newParentId: string) => void;
  onSaveCategories: () => void;
  onDeleteCategory: (category: Category) => void;
}

/**
 * Functional component for categories editor
 */
const CategoriesEditor: React.FC<Props> = ({
  treeData,
  selectedCategory,
  openCategories,
  classes,
  onAddCategory,
  onSelectCategory,
  onUpdateCategory,
  onUpdateCategoryOrder,
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
      <Toolbar className={ classes.toolbar }>
        <Button
          color="primary"
          startIcon={ <AddIcon /> }
          onClick={ () => onAddCategory(undefined) }
          style={{
            marginTop: 10,
            marginLeft: 10
          }}>
          { strings.categories.addCategory }
        </Button>
        <GenericButton
          onClick={ () => onSaveCategories() }
          text={ strings.generic.save }
          style={{
            backgroundColor: "#00B6ED",
            marginTop: 10,
            marginLeft: 10
          }}
        />
      </Toolbar>
      <div className={ classes.editorContent }>
        <div className={ classes.treeContainer }>
          <SortableTree
            innerStyle={{ height: "auto" }}
            rowHeight={ 64 }
            className={ classes.treeWrapper }
            theme={ FileExplorerTheme }
            treeData={ constructTreeData() }
            onVisibilityToggle={ data => onSelectCategory(data.node.category) }
            onChange={ () => {} }
            onMoveNode={ ({ nextParentNode, node }) => onUpdateCategoryOrder(node.category, nextParentNode?.id) }
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
    </div>
  );
};

export default withStyles(styles)(CategoriesEditor);
