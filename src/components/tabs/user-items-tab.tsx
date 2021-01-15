import * as React from "react";

import { Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/tabs/user-items-tab";
import { Item } from "../../generated/client";
import GenericListItem from "../generic/generic-list-item";
import ItemsRow from "../generic/items-row";
import { History } from "history";
import strings from "../../localization/strings";
import theme from "../../styles/theme";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  userItems: Item[];
  onDeleteItemClick: (item: Item) => void;
  onEditItemClick: (item: Item) => void;
  history: History;
}

/**
 * Functional component for users items listing tab
 *
 * @param props component properties
 */
const UserItemsTab: React.FC<Props> = ({
  userItems,
  onDeleteItemClick,
  onEditItemClick,
  history,
  classes
}) => {

  /**
   * Generates user items
   */
  const generateUserItemList = () => {
    if (userItems.length === 0) {
      return (
        <div style={{ padding: theme.spacing(2) }}>
          <Typography variant="h4">
            { strings.userPage.noUserItems }
          </Typography>
        </div>
      );
    }
    return userItems.map(item => {
      return (
        <GenericListItem
          key={ item.id }
          card={ true }
          item={ item }
          onClick={ () => onItemClick(item) }
          onDeleteClick={ () => onDeleteItemClick(item) }
          onEditClick={ () => onEditItemClick(item) }
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
    history.push(`/item/${item.id}`);
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
