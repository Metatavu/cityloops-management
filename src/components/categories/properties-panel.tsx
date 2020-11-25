import * as React from "react";

import { withStyles, WithStyles, TextField } from "@material-ui/core";
import styles from "../../styles/components/categories/properties-panel";
import strings from "../../localization/strings";
import { Category, CategoryProperty } from "../../generated/client";
import CategoryPropertyList from "./category-property-list";
import CategoryPropertyInfo from "./category-property-info";
import produce from "immer";

/**
 * Component properties
 */
interface Props extends WithStyles<typeof styles> {
  category: Category;
  onCategoryUpdate: (category: Category) => void;
}

/**
 * Functional component for properties panel
 * 
 * @param props component properties
 */
const PropertiesPanel: React.FC<Props> = ({
  category,
  classes,
  onCategoryUpdate
}) => {
  const { name, properties } = category;
  const [ selectedPropertyIndex, setSelectedPropertyIndex ] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (
      !properties ||
      (selectedPropertyIndex && selectedPropertyIndex >= properties.length)
    ) {
      setSelectedPropertyIndex(undefined);
    }
  }, [properties, selectedPropertyIndex]);

  /**
   * Event handler for input change
   *
   * @param event React change event
   */
  const onNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onCategoryUpdate({ ...category, name: event.target.value });
  };

  /**
   * Updates property to category
   * 
   * @param index index of property
   * @param updatedProperty updated property
   */
  const updateProperty = (index: number) => (updatedProperty: CategoryProperty) => {
    onUpdatePropertyList(
      produce(properties || [], draft => {
        draft[index] = updatedProperty;
      })
    );
  }

  /**
   * Event handler for update property list
   * 
   * @param updatedProperties updated properties list
   */
  const onUpdatePropertyList = (updatedProperties: CategoryProperty[]) => {
    onCategoryUpdate({ ...category, properties: updatedProperties });
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <div className={ classes.propertiesContainer }>
        <TextField
          fullWidth
          variant="outlined"
          label={ strings.generic.name }
          InputLabelProps={{ variant: "outlined" }}
          value={ name || "" }
          name="name"
          onChange={ onNameChange }
          className={ classes.nameField }
        />
        <CategoryPropertyList
          properties={ category.properties || [] }
          selectedIndex={ selectedPropertyIndex }
          onSelectProperty={ setSelectedPropertyIndex }
          onUpdateProperties={ onUpdatePropertyList }
        />
      </div>
      { properties && selectedPropertyIndex !== undefined && selectedPropertyIndex < properties.length &&
        <div className={ classes.propertyInfoContainer }>
            <CategoryPropertyInfo
              property={ properties[selectedPropertyIndex] }
              onUpdate={ updateProperty(selectedPropertyIndex!) }
            />
        </div>
      }
    </div>
  );
};

export default withStyles(styles)(PropertiesPanel);