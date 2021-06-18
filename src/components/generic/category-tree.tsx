import { CircularProgress, List, ListItem, Typography, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import TreeMenu, { TreeMenuItem, TreeNodeInArray } from "react-simple-tree-menu";
import styles from "../../styles/components/generic/category-tree";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { TreeDataUtils } from "../../utils/tree-data-utils";
import { Category } from "../../generated/client";
import { CategoryDataHolder } from "../../types";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  disabled?: boolean;
  selected?: Category;
  onSelect?: (category: Category) => void;
}

/**
 * Category tree component
 * 
 * @param props component properties
 */
const CategoryTree: React.FC<Props> = props => {
  const {
    classes,
    categories,
    disabled,
    selected,
    onSelect
  } = props;

  const treeStructure = TreeDataUtils.constructTreeData(categories);
  const treeNodes = translateToTreeNodes(treeStructure);

  /**
   * Component render
   */
  if (treeNodes.length < 1) {
    return (
      <div className={ classes.root }>
        <CircularProgress className={ classes.loader } />
      </div>
    );
  }

  let openNode: string | null = null;
  if (selected?.id) {
    if (selected?.parentCategoryId) {
      openNode = selected?.parentCategoryId;
    }
  }

  return (
    <div className={ classes.root }>
      <TreeMenu
        data={ treeNodes }
        hasSearch={ false }
        initialOpenNodes={ openNode ? [ openNode ] : [ selected?.id || "" ] }
        initialActiveKey={ selected?.id ?? "" }
        initialFocusKey={ selected?.id ?? "" }
        onClickItem={ ({ key, label, ...props }) => !disabled && onSelect && onSelect(props.category) }
      >
        {({ items }) => (
          <List className={ classes.list }>
            { items.map(item => renderTreeMenuItem(item, props)) }
          </List>
        )}
      </TreeMenu>
    </div>
  );
}

/**
 * Renders tree menu item
 *
 * @param item tree menu item
 * @param props component properties
 */
const renderTreeMenuItem = (item: TreeMenuItem, props: Props) => {
  const {
    level,
    focused,
    hasNodes,
    toggleNode,
    isOpen,
    label,
    openNodes,
    searchTerm,
    active,
    ...otherProps
  } = item;

  const { classes, disabled } = props;
  const toggleIcon = (on: boolean) => on ? 
    <ArrowDropUpIcon /> :
    <ArrowDropDownIcon />;

  return (
    <ListItem
      { ...otherProps }
      disabled={ disabled }
      className={
        classNames(
          classes.listItem,
          level === 0 ? classes.rootLevel : "",
          focused ? classes.focused : "",
          active ? classes.focused : ""
        )
      }
      style={{ paddingLeft: (1 + level) * 20 }}
    >
      <Typography className={ classes.listItemTitle }>
        { label }
      </Typography>
      { hasNodes &&
        <div
          className={ classes.listItemToggleIcon }
          onClick={ onNodeClick(hasNodes, toggleNode) }
        >
          { toggleIcon(isOpen) }
        </div>
      }
    </ListItem>
  );
}

/**
 * Translates tree structure from category data holders to tree nodes
 * 
 * @param treeStructure tree structure
 * @returns array of tree nodes
 */
const translateToTreeNodes = (treeStructure: CategoryDataHolder[]): TreeNodeInArray[] => {
  return treeStructure.length > 0 ?
    treeStructure.map(item => ({
      key: item.category.id || "",
      label: item.category.name,
      category: item.category,
      nodes: translateToTreeNodes(item.childCategories)
    })) :
    [];
}

/**
 * Handler for on node click event
 * 
 * @param hasNodes has nodes
 * @param toggleNode handler method for toggle node
 * @param event React mouse event
 */
const onNodeClick = (hasNodes: boolean, toggleNode: (() => void) | undefined) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (hasNodes && toggleNode) {
    toggleNode();
  }
  event.stopPropagation();
}

export default withStyles(styles)(CategoryTree);