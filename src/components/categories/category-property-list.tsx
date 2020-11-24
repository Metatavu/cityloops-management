import * as React from "react";

import { withStyles, WithStyles, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import styles from "../../styles/components/categories/category-property-list";
import strings from "../../localization/strings";
import { CategoryProperty, CategoryPropertyInputType } from "../../generated/client";
import * as GenericUtils from "../../utils/generic-utils";
import produce from "immer";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from "@material-ui/icons/Delete";

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
  }

  /**
   * Event handler for delete property
   * 
   * @param index index of property
   */
  const onDelete = (index: number) => () => {
    if (properties.length <= index) {
      return;
    }

    const confirmationMessage = strings.formatString(
      strings.generic.customConfirmDelete,
      strings.categories.category.toLowerCase(),
      properties[index].name
    ) as string;

    if (!GenericUtils.askConfirmation(confirmationMessage)) {
      return;
    }

    onUpdateProperties(
      produce(properties, draft => {
        draft.splice(index, 1);
      })
    );
  }

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
          <IconButton
            onClick={ onDelete(index) }
          >
            <DeleteIcon className={ classes.deleteIcon } />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  /**
   * Renders add property item
   */
  const renderAdd = () => {
    return (
      <ListItem
        onClick={ onAdd }
        className={ classes.listItem }
      >
        <ListItemText>
          { strings.categories.addProperty }
        </ListItemText>
        <ListItemSecondaryAction>
          <AddCircleIcon
            className={ classes.addIcon }
            onClick={ onAdd }
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  /**
   * Component render
   */
  return (
    <List>
      { properties.map((property, index) => renderProperty(property, index)) }
      { renderAdd() }
    </List>
  );
};

export default withStyles(styles)(CategoryPropertyList);