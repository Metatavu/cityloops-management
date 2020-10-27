import * as React from "react";
import { TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/location-section";
import { LocationInfo } from "../../generated/client";
import strings from "../../localization/strings";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  locationInfo: LocationInfo;
  onUpdate?: (locationInfo: LocationInfo) => void;
}

/**
 * Location section component
 */
const LocationSection: React.FC<Props> = props => {
  const { classes, locationInfo, onUpdate } = props;
  const {
    address,
    description,
    email,
    phone
  } = locationInfo;

  /**
   * Event handler for on change
   * 
   * @param key property key
   * @param event React change event
   */
  const onChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (locationInfo && onUpdate) {
      onUpdate({ ...locationInfo, [key]: event.target.value });
    }
  }

  /**
   * Renders text field
   * 
   * @param key property key
   * @param displayName property display name
   * @param value property value
   */
  const renderTextfield = (
    key: string,
    displayName: string,
    value: string
  ) => {
    return (
      <TextField
        key={ key }
        label={ displayName }
        value={ value }
        onChange={ onChange(key) }
        fullWidth
        variant="outlined"
        InputLabelProps={{ variant: "outlined" }}
        className={ classes.textField }
      />
    );
  }

  /**
   * Component render
   */
  return(
    <div className={ classes.root }>
      <Typography variant="h6">
        { strings.items.location }
      </Typography>
      { renderTextfield("description", strings.items.locationInfo.description, description || "") }
      { renderTextfield("phone", strings.items.locationInfo.phone, phone || "") }
      { renderTextfield("email", strings.items.locationInfo.email, email || "") }
      { renderTextfield("address", strings.items.locationInfo.address, address || "") }
      {/**
       * TODO:
       * Add actual functionality to location display
      */}
      <div className={ classes.locationPlaceholder } />
    </div>
  );
};

export default withStyles(styles)(LocationSection);