import * as React from "react";

import { Checkbox, FormControlLabel, MenuItem, TextField, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/categories/category-property-info";
import strings from "../../localization/strings";
import { CategoryProperty, CategoryPropertyInputType } from "../../generated/client";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  property: CategoryProperty;
  onUpdate: (property: CategoryProperty) => void;
}

/**
 * Functional component for category property list
 */
const CategoryPropertyInfo: React.FC<Props> = ({
  classes,
  property,
  onUpdate
}) => {

  /**
   * Event handler for input change
   *
   * @param event React change event
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    if (name === "defaultValue" && property.type === CategoryPropertyInputType.NUMBER) {
      const valueAsNumber = Number(value);
      onUpdate({
        ...property,
        defaultValue: !Number.isNaN(valueAsNumber) && valueAsNumber < 0 ? "" : value
      });
      return;
    }

    if (name === "required") {
      onUpdate({
        ...property,
        required: checked
      });
      return;
    }
    
    onUpdate({
      ...property,
      [event.target.name]: value
    });
  };

  /**
   * Renders select menu item
   */
  const renderMenuItem = (displayName: string, value: string) => {
    return (
      <MenuItem
        key={ value }
        value={ value }
      >
        { displayName }
      </MenuItem>
    );
  }

  /**
   * Renders default value field
   */
  const renderDefaultValueField = () => {
    switch (property.type) {
      case CategoryPropertyInputType.NUMBER:
        return (
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            label={ strings.generic.defaultValue }
            inputProps={{ min: 0 }}
            InputLabelProps={{ variant: "outlined" }}
            value={ property.defaultValue || "" }
            name="defaultValue"
            onChange={ onChange }
            className={ classes.textField }
          />
        );
      case CategoryPropertyInputType.TEXT:
      case CategoryPropertyInputType.TEXTAREA:
      default:
        return (
          <TextField
            fullWidth
            multiline
            rowsMax={ 8 }
            variant="outlined"
            label={ strings.generic.defaultValue }
            inputProps={{ min: 0 }}
            InputLabelProps={{ variant: "outlined" }}
            value={ property.defaultValue || "" }
            name="defaultValue"
            onChange={ onChange }
            className={ classes.textField }
          />
        );
    }
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <TextField
        fullWidth
        variant="outlined"
        label={ strings.generic.name }
        InputLabelProps={{ variant: "outlined" }}
        value={ property.name || "" }
        name="name"
        onChange={ onChange }
        className={ classes.textField }
      />
      <TextField
        select
        fullWidth
        variant="outlined"
        label={ strings.generic.type }
        InputLabelProps={{ variant: "outlined" }}
        value={ property.type }
        name="type"
        onChange={ onChange }
        className={ classes.textField }
      >
        { renderMenuItem(strings.categories.propertyTypes.text, CategoryPropertyInputType.TEXT) }
        { renderMenuItem(strings.categories.propertyTypes.textarea, CategoryPropertyInputType.TEXTAREA) }
        { renderMenuItem(strings.categories.propertyTypes.number, CategoryPropertyInputType.NUMBER) }
      </TextField>
      { renderDefaultValueField() }
      <FormControlLabel
        control={
          <Checkbox
            checked={ property.required }
            onChange={ onChange }
            name="required"
          />
        }
        label={ strings.generic.mandatoryField }
      />
    </div>
  );

};

export default withStyles(styles)(CategoryPropertyInfo);
