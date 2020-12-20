import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles, WithStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";
import produce from "immer";
import * as React from "react";
import { CategoryProperty, CategoryPropertyInputType } from "../../generated/client";
import strings from "../../localization/strings";
import styles from "../../styles/components/categories/category-property-list";
import GenericConfirmDialog from "../generic/generic-confirm-dialog";


/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  properties: CategoryProperty[];
  selectedIndex?: number;
  onSelectProperty?: (index: number) => void;
  onUpdateProperties: (propertyList: CategoryProperty[]) => void;
}

/**
 * Functional component for category property list
 */
const CategoryPropertyList: React.FC<Props> = ({
  properties,
  selectedIndex,
  classes,
  onSelectProperty,
  onUpdateProperties
}) => {

  const [ propertyToDelete, setPropertyToDelete ] = React.useState<CategoryProperty | undefined>(undefined);

  /**
   * Event handler for add property
   */
  const onAdd = () => {
    onUpdateProperties(
      produce(properties, draft => {
        draft.push({
          name: strings.categories.newProperty,
          required: false,
          type: CategoryPropertyInputType.TEXT
        });
      })
    );
  };

  /**
   * Event handler for delete property
   *
   * @param propertyToDelete property to delete
   */
  const onDelete = (propertyToDelete: CategoryProperty) => () => {
    const propertyIndex = properties.findIndex(property => property.name === propertyToDelete.name);
    if (propertyIndex < 0) {
      return;
    }

    onUpdateProperties(
      produce(properties, draft => {
        draft.splice(propertyIndex, 1);
      })
    );

    setPropertyToDelete(undefined);
  }

  /**
   * Event handler for delete dialog cancel
   */
  const onCancel = () => setPropertyToDelete(undefined);

  /**
   * Renders property
   * 
   * @param property property
   * @param index index of property
   */
  const renderProperty = (property: CategoryProperty, index: number) => {
    return (
      <ListItem
        key={ index }
        selected={ index === selectedIndex }
        onClick={ () => onSelectProperty && onSelectProperty(index) }
        className={ classes.listItem }
      >
        <ListItemText>
          { property.name }
        </ListItemText>
        <ListItemSecondaryAction>
          <Button
            color="inherit"
            onClick={ () => setPropertyToDelete(property) }
          >
            { strings.generic.delete }
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  /**
   * Renders add property item
   */
  const renderAdd = () => {
    return (
      <Button
        startIcon={ <AddIcon /> }
        color="primary"
        onClick={ onAdd }
      >
        { strings.categories.addProperty }
      </Button>
    );
  };

  const deleteDialogTitle = propertyToDelete ? strings.formatString(
    strings.generic.customConfirmDelete,
    strings.categories.category.toLowerCase(),
    propertyToDelete.name
  ) : undefined;

  /**
   * Component render
   */
  return (
    <>
      { renderAdd() }
      <List>
        { properties.map((property, index) => renderProperty(property, index)) }
      </List>
      { propertyToDelete &&
        <GenericConfirmDialog
          open={ !!propertyToDelete }
          title={ deleteDialogTitle as string }
          confirmButtonText={ strings.generic.yes }
          cancelButtonText={ strings.generic.cancel }
          onCancel={ onCancel }
          onClose={ onCancel }
          onConfirm={ onDelete(propertyToDelete) }
        >
          <Typography>{ strings.generic.confirmDeleteText }</Typography>
        </GenericConfirmDialog>
      }
    </>
  );
};

export default withStyles(styles)(CategoryPropertyList);
