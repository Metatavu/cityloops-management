import * as React from "react";
import { WithStyles, withStyles, ListItemAvatar, Typography, Card, CardActions, CardContent, Button, Box } from "@material-ui/core";
import styles from "../../styles/components/generic/generic-list-item";
import { Item } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import strings from "../../localization/strings";
import brokenImage from "../../resources/svg/broken-image-icon.svg";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  item: Item;
  style?: CSSProperties;
  card?: boolean;
  onClick: (item: Item) => void;
  onDeleteClick?: (item: Item) => void;
  onEditClick?: (item: Item) => void;
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
    onDeleteClick,
    onEditClick
  } = props;

  const isMTItem = item.userId === "materiaalitori";

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

  /**
   * TODO: Add price to card once API changes are ready
   */
  return (
    <Card
      elevation={ card ? 0 : 0 }
      className={` ${ classes.root } ${ card ? classes.card : classes.list }`}
      onClick={ onCardClick }
      style={ style }
    >
      {
        !card ?
          <CardContent className={ classes.listContent }>
            <ListItemAvatar className={ classes.listItemAvatar }>
              <img
                className={ classes.cardImage }
                alt={ `itemImage-${item.id}` }
                src={ item.images && item.images.length > 0 ? item.images[0] : brokenImage }
              />
            </ListItemAvatar>
            <div className={ classes.cardListVariantContent }>
              <div>
                <div className={ classes.spaceBetweenContent }>
                  <Typography variant="h4">
                    { item.title }
                  </Typography>
                  { item.price !== 0 &&
                    <Typography variant="h3">
                      { item.price } { item.priceUnit }
                    </Typography>
                  }
                </div>
              </div>
              <div className={ classes.spaceBetweenContent }>
                <Typography variant="subtitle1">
                  { item.metadata.locationInfo.address }
                </Typography>
                <Typography variant="subtitle2">
                  { item.metadata.locationInfo.description }
                </Typography>
              </div>
            </div>
          </CardContent>
        :
        <CardContent className={ classes.cardContent }>
          <Box className={ classes.imageWrapper }>
            <img
              className={ classes.cardImage }
              alt={ `itemImage-${item.id}` }
              src={ item.images && item.images.length > 0 ? item.images[0] : brokenImage }
            />
            { item.price !== 0 &&
              <Box className={ classes.priceContainer }>
                <Typography variant="h5" className={ classes.priceText } >
                  { item.price } { item.priceUnit }
                </Typography>
              </Box>
            }
          </Box>
          <Typography
            style={{ width: "100%" }}
            variant="h4"
          >
            { item.title }
          </Typography>
          <Typography variant="subtitle1">
            {`${ item.metadata.locationInfo.address }` }
          </Typography>
        </CardContent>
      }
      <CardActions>
        { onEditClick &&
          <Button
            variant="text"
            color="secondary"
            onClick={ event => {
                event.stopPropagation();
                onEditClick(item);
              }
            }
          >
            { strings.generic.edit }
          </Button>
        }
        { onDeleteClick &&
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
        }
      </CardActions>
    </Card>
  );

};

export default withStyles(styles)(GenericListItem);
