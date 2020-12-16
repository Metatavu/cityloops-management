import * as React from "react";

import styles from "../../styles/components/generic/item-list";
import { IconButton, List, Toolbar, Typography, WithStyles, withStyles } from "@material-ui/core";
import { Item } from "../../generated/client";

import GenericListItem from "../generic/generic-list-item";
import strings from "../../localization/strings";

import GridIcon from "@material-ui/icons/GridOn";
import ListIcon from "@material-ui/icons/List";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  itemList: Item[];
  cards?: boolean;
  title?: string;
  updatePath: (item: Item) => void;
  deleteItem?: (item: Item) => void;
  onToggleListModeClick?: () => void;
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
    const { classes, itemList, cards, title, deleteItem, onToggleListModeClick } = this.props;

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
      <div className={ classes.root }>
        <Toolbar className={ classes.toolBar }>
          { title &&
            <Typography
            color="primary"
            className={ classes.title }
            variant="h1"
            >
              { title }
            </Typography>
          }
          <IconButton
            onClick={ onToggleListModeClick }
            title={ cards ? strings.items.showAsList : strings.items.showAsGrid}
          >
            { cards ? <ListIcon /> : <GridIcon />}
          </IconButton>
        </Toolbar>
        <List
          disablePadding
          className={`${ classes.listRoot } ${ cards ? classes.cards : classes.list } `}
        >
          { listItems }
        </List>
      </div>
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
