import * as React from "react";
import { WithStyles, withStyles, ListItemAvatar, Typography, Card, CardActions, CardContent, Button } from '@material-ui/core';
import styles from "../../styles/components/generic/generic-list-item";
import { Item } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import strings from "../../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  item: Item;
  style?: CSSProperties;
  card?: boolean;
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
    card,
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
      elevation={ card ? 0 : 0 }
      className={ card ? classes.card : classes.list }
      onClick={ onCardClick }
      style={ style }
    >
      {
        !card ?
          <CardContent className={ classes.listContent }>
            <ListItemAvatar className={ classes.listItemAvatar }>
              <img
                alt={ `itemImage-${item.id}` }
                src={ item.images ? item.images[0] : defaultImage }
                style={{ width: 200, height: 200 }}
              />
            </ListItemAvatar>
            <Typography
              style={{ width: "100%" }}
              variant="h2"
            >
              { item.title }
            </Typography>
          </CardContent>
        :
        <CardContent className={ classes.cardContent }>
          <div className={ classes.imageWrapper }>
            <img
              className={ classes.cardImage }
              alt={ `itemImage-${item.id}` }
              src={ item.images ? item.images[0] : defaultImage }
              />
          </div>
        <Typography
          style={{ width: "100%" }}
          variant="h4"
        >
          { item.title }
        </Typography>
        </CardContent>
      }
      <CardActions>
        <Button
          variant="text"
          color="secondary"
          onClick={ event => {
              event.stopPropagation();
              onDeleteClick(item);
            }
          }
        >
          { strings.generic.delete }
        </Button>
      </CardActions>
    </Card>
  );

};

export default withStyles(styles)(GenericListItem);
