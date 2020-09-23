import * as React from "react";
import { WithStyles, withStyles, Typography } from '@material-ui/core';
import styles from "../../styles/components/generic/generic-tree-item";
import { Category } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import GenericButton from "../generic/generic-button";
import strings from "../../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  category: Category;
  style?: CSSProperties;
  hasChildElements: boolean;
  onAddCategoryClick: (parentCategoryId?: string) => void;
  onClick: (category: Category) => void;
  onDeleteClick: (category: Category) => void;
}

/**
 * React generic tree item functional component
 */
const GenericTreeItem: React.FC<Props> = props => {
  const {
    classes,
    category,
    style,
    hasChildElements,
    onAddCategoryClick,
    onClick,
    onDeleteClick
  } = props;

  return(
    <div
      className={ classes.root }
      onClick={ () => onClick(category) }
      style={ style }
    >
      <Typography className={ classes.title }>
        { category.name || "" }
      </Typography>
        <GenericButton
          disabled={ hasChildElements }
          onClick={
            event => {
              event.stopPropagation();
              onDeleteClick(category);
            }
          }
          text={ strings.generic.delete }
          style={{ backgroundColor: "#004D76", marginRight: 10 }}
        />
        <GenericButton
          onClick={ () => onAddCategoryClick(category.id) }
          text={ strings.categories.addSubCategory }
          style={{ backgroundColor: "#00B6ED"}}
        />
    </div>
  );
};

export default withStyles(styles)(GenericTreeItem);