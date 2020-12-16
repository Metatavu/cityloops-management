import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/tabs/user-items-tab";
import { Item } from "../../generated/client";
import GenericListItem from "../generic/generic-list-item";
import ItemsRow from "../generic/items-row";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  userItems: Item[];
  onDeleteItemClick: (item: Item) => void;
}

/**
 * Functional component for users items listing tab
 *
 * @param props component properties
 */
const UserItemsTab: React.FC<Props> = ({
  userItems,
  onDeleteItemClick,
  classes
}) => {

  /**
   * Generates user items
   */
  const generateUserItemList = () => {
    return userItems.map(item => {
      return (
        <GenericListItem
          key={ item.id }
          card={ true }
          item={ item }
          onClick={ () => onItemClick(item) }
          onDeleteClick={ () => onDeleteItemClick(item) }
        />
      );
    });
  };

  /**
   * Event handler for item click
   *
   * @param item clicked item
   */
  const onItemClick = (item: Item) => {
    window.location.href = `/item/${item.id}`;
  };

  /**
   * Component render
   */
  return (
    <div className={ classes.container }>
      <ItemsRow>
        { generateUserItemList() }
      </ItemsRow>
    </div>
  );
};

export default withStyles(styles)(UserItemsTab);
