import { Button, Typography, WithStyles, withStyles } from '@material-ui/core';
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/AddCircle";
import * as React from "react";
import { Category } from "../../generated/client";
import strings from "../../localization/strings";
import styles from "../../styles/components/generic/generic-tree-item";
import theme from "../../styles/theme";

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
    <>
      <div
        className={ classes.root }
        onClick={ () => onClick(category) }
        style={ style }
      >
        <div className={ classes.topRow }>
          <Typography variant="h5">
            { category.name || "" }
          </Typography>
          <Button
            size="small"
            color="inherit"
            disabled={ hasChildElements }
            onClick={
              event => {
                event.stopPropagation();
                onDeleteClick(category);
              }
            }
            style={{ marginRight: theme.spacing(1) }}
          >
            { strings.generic.delete }
          </Button>
        </div>
          <Button
            style={{ marginLeft: theme.spacing(0.5) }}
            startIcon={ <AddIcon /> }
            size="small"
            color="inherit"
            onClick={ () => onAddCategoryClick(category.id) }
            title={ strings.categories.addSubCategory }
          >
            { strings.generic.add }
          </Button>
      </div>
    </>
  );
};

export default withStyles(styles)(GenericTreeItem);