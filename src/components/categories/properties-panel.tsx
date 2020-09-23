import * as React from "react";

import { withStyles, WithStyles, Typography, TextField } from "@material-ui/core";
import styles from "../../styles/components/categories/properties-panel";
import strings from "../../localization/strings";
import { Category } from "../../generated/client";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  category: Category;
  onCategoryUpdate: (category: Category) => void;
}

/**
 * Functional component for properties panel
 */
const PropertiesPanel: React.FC<Props> = props => {
  const { category, classes } = props;

  return (
    <div className={ classes.propertiesContainer }>
      <Typography variant="h4">
        { strings.generic.name }
      </Typography>
      <TextField
        value={ category.name }
        name="name"
        onChange={ onInputChange(props) }
      />
    </div>
  );
};

/**
 * Event handler for input change
 *
 * @param props component props
 * @param event React change event
 */
const onInputChange = (props: Props) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  const { category, onCategoryUpdate } = props;
  const { name, value } = event.target;
  if (!name) {
    return;
  }
  const updatedCategory: Category = { ...category, name: value };
  onCategoryUpdate(updatedCategory);
};

export default withStyles(styles)(PropertiesPanel);