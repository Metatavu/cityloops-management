import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/add-item-screen";
import { Item } from "../../generated/client";
import GenericListItem from "../generic/generic-list-item";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  userItems: Item[];
}

/**
 * Functional component for users items listing tab
 */
const UserItemsTab: React.FC<Props> = ({ userItems }) => {

  /**
   * Generates user items
   */
  const generateUserItemList = () => {
    return userItems.map(item => {
      return (
        <GenericListItem
          card={ true }
          item={ item }
          onClick={ () => onItemClick(item) }
          style={{ maxWidth: 250 }}
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
    <div style={{ display: "flex" }}>
      { generateUserItemList() }
    </div>
  );
};

export default withStyles(styles)(UserItemsTab);