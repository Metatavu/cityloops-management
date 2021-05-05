import * as React from "react";
import { TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/properties-section";
import { ItemProperty, ItemType } from "../../generated/client";
import produce from "immer";
import ImageList from "./image-list";
import strings from "../../localization/strings";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  type: ItemType;
  title?: string;
  images?: string[];
  properties?: ItemProperty[];
  onUpdateTitle?: (title: string) => void;
  onUpdateImages: (images: File[]) => void;
  onUpdateProperties?: (properties: ItemProperty[]) => void;
  onImageDeleteClick: (imageUrl: string) => void;
}

/**
 * Properties section component
 */
const PropertiesSection: React.FC<Props> = props => {
  const {
    classes,
    type,
    title,
    properties,
    images,
    onUpdateTitle,
    onUpdateProperties,
    onUpdateImages,
    onImageDeleteClick
  } = props;

  /**
   * Event handler for update property value
   *
   * @param index property index
   * @param event React change event
   */
  const onUpdateProperty = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProperties = produce(properties, draft => {
      if (!draft) {
        return;
      }

      draft[index].value = event.target.value;
    });

    if (updatedProperties && onUpdateProperties) {
      onUpdateProperties(updatedProperties);
    }
  };

  const filteredProperties = type === ItemType.BUY ? properties?.filter(property => property.key === "Lisätiedot") : properties;

  const propertyFields = filteredProperties?.map((property, index) =>
    <TextField
      key={ `${property.key}-${index}` }
      label={ property.key }
      size="medium"
      variant="outlined"
      fullWidth
      multiline={ property.key === "Lisätiedot" }
      rows={ 3 }
      rowsMax={ 10 }
      className={ classes.propertyField }
      InputLabelProps={{ variant: "outlined" }}
      value={ property.value || "" }
      onChange={ onUpdateProperty(index) }
    />
  );

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <ImageList
        title={ strings.items.images }
        images={ images }
        onUpdate={ onUpdateImages }
        onImageDeleteClick={ onImageDeleteClick }
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