import * as React from "react";

import styles from "../../styles/components/generic/item-list";
import { List, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Item } from "../../generated/client";

import GenericListItem from "../generic/generic-list-item";
import theme from "../../styles/theme";
import strings from "../../localization/strings";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  itemList: Item[];
  cards?: boolean;
  title?: string;
  updatePath: (item: Item) => void;
  deleteItem?: (item: Item) => void;
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
    const { classes, itemList, cards, title, deleteItem } = this.props;

    const listItems = itemList.length < 1 ?
    <Typography>{ strings.items.noItems }</Typography> :
    itemList.map(item => {
      return(
        <GenericListItem
          card={ cards }
          key={ item.id }
          item={ item }
          onClick={ this.onItemClick }
          onDeleteClick={ deleteItem }
        />
      );
    });

    return (
      <>
        { title &&
          <Typography
            color="primary"
            style={{ marginTop: theme.spacing(2) }}
            variant="h1"
          >
            { title }
          </Typography>
        }
        <List className={ cards ? classes.cards : classes.list }>
          { listItems }
        </List>
      </>
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

}

export default withStyles(styles)(ItemList);
