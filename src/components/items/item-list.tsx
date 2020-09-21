import * as React from "react";

import styles from "../../styles/components/screens/main-view";
import { List, WithStyles, withStyles } from "@material-ui/core";
import { Item } from "../../generated/client";

import GenericListItem from "../generic/generic-list-item";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  itemList: Item[];
  updatePath: (item: Item) => void;
  deleteItem: (item: Item) => void;
}

/**
 * Component state
 */
interface State {
}

/**
 * Component for item list
 */
export class ItemList extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Component render method
   */
  public render = () => {
    const { itemList } = this.props;

    const listItems = itemList.map(item => {
      return(
        <GenericListItem
          key={ item.id }
          item={ item }
          onClick={ this.onItemClick }
          onDeleteClick={ this.onDeleteClick }
        />
      );
    });

    return (
      <List>
        { listItems }
      </List>
    );
  }

  /**
   * Event handler for item click
   *
   * @param item clicked item
   */
  private onItemClick = (item: Item) => {
    const { updatePath } = this.props;
    updatePath(item);
  }

  /**
   * Event handler for item delete click
   *
   * @param item clicked item
   */
  private onDeleteClick = (item: Item) => {
    const { deleteItem } = this.props;
    deleteItem(item);
  }

}

export default withStyles(styles)(ItemList);
