import * as React from "react";
import { TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/properties-section";
import { ItemProperty } from "../../generated/client";
import produce from "immer";
import ImageList from "./image-list";
import strings from "../../localization/strings";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  title?: string;
  images?: string[];
  properties?: ItemProperty[];
  onUpdateTitle?: (title: string) => void;
  onUpdateImages?: (images: string[]) => void;
  onUpdateProperties?: (properties: ItemProperty[]) => void;
}

/**
 * Properties section component
 */
const PropertiesSection: React.FC<Props> = props => {
  const {
    classes,
    title,
    properties,
    images,
    onUpdateTitle,
    onUpdateProperties,
    onUpdateImages
  } = props;

  /**
   * Event handler for update property value
   * 
   * @param key property key
   * @param event React change event
   */
  const onUpdateProperty = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProperties = produce(properties, draft => {
      if (!draft) {
        return;
      }

      const propertyIndex = draft.findIndex(property => property.key === key);
      if (propertyIndex > -1) {
        draft[propertyIndex].value = event.target.value;
      }
    });

    if (updatedProperties && onUpdateProperties) {
      onUpdateProperties(updatedProperties);
    }
  }

  const propertyFields = properties ?
    properties.map(property => 
      <TextField
        key={ property.key }
        label={ property.key }
        size="medium"
        variant="outlined"
        fullWidth
        className={ classes.propertyField }
        InputLabelProps={{ variant: "outlined" }}
        value={ property.value || "" }
        onChange={ onUpdateProperty(property.key) }
      />
    ) :
    [];

  /**
   * Component render
   */
  return(
    <div className={ classes.root }>
      <ImageList
        images={ images }
        onUpdate={ onUpdateImages }
      />
      <div className={ classes.propertiesContainer }>
        <TextField
          key={ "title" }
          label={ strings.items.itemTitle }
          size="medium"
          variant="outlined"
          fullWidth
          className={ classes.propertyField }
          InputLabelProps={{ variant: "outlined" }}
          value={ title || "" }
          onChange={ e => onUpdateTitle && onUpdateTitle(e.target.value) }
        />
        { propertyFields }
      </div>
    </div>
  );
};

export default withStyles(styles)(PropertiesSection);