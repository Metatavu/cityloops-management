import * as React from "react";
import { WithStyles, withStyles, ListItemAvatar, Typography, Card, CardActions } from '@material-ui/core';
import styles from "../../styles/components/generic/generic-list-item";
import { Item } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  item: Item;
  style?: CSSProperties;
  onClick: (item: Item) => void;
  onDeleteClick: (item: Item) => void;
}

/**
 * React generic list item functional component
 */
const GenericListItem: React.FC<Props> = props => {
  const {
    classes,
    item,
    style,
    onClick,
    onDeleteClick
  } = props;

  const isMTItem = item.userId === "materiaalitori";
  const defaultImage = "https://staging-muisti-cdn.metatavu.io/folder/f2d54335-2015-4ccc-8ac2-d4c113b05dc6.jpg";

  /**
   * Event handler for card click
   */
  const onCardClick = () => {
    if (isMTItem) {
      window.open(
        `https://materiaalitori.fi/ilmoitukset/${item.id}`,
        "_blank"
      );
    } else {
      onClick(item);
    }
  };

  return(
    <Card
      className={ classes.root }
      onClick={ () => onCardClick() }
      style={ style }
    >
      <ListItemAvatar>
        <img
          alt={ `itemImage-${item.id}` }
          src={ item.images ? item.images[0] : defaultImage }
          style={{ width: 100, height: 100 }}
        />
      </ListItemAvatar>
      <Typography
        style={{ width: "100%" }}
        variant="h4"
      >
        { item.title }
      </Typography>
      <CardActions>
        <DeleteOutlineIcon
          onClick={ event => {
              event.stopPropagation();
              onDeleteClick(item);
            }
          }
        />
      </CardActions>
    </Card>
  );

};

export default withStyles(styles)(GenericListItem);
