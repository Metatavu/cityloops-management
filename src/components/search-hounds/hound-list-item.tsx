import * as React from "react";
import { WithStyles, withStyles, Typography, Card, CardActions, CardContent, Button } from "@material-ui/core";
import styles from "../../styles/components/search-hounds/hound-list-item";
import { SearchHound } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import strings from "../../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  searchHound: SearchHound;
  style?: CSSProperties;
  onClick: (searchHound: SearchHound) => void;
  onDeleteClick?: (searchHound: SearchHound) => void;
}

/**
 * React functional component for SearchHound list items
 */
const HoundListItem: React.FC<Props> = props => {
  const {
    classes,
    searchHound,
    style,
    onClick,
    onDeleteClick
  } = props;

  /**
   * Component render
   */
  return (
    <Card
      className={ classes.card }
      onClick={ () => onClick(searchHound) }
      style={ style }
    >
      <CardContent className={ classes.listContent }>
        <div className={ classes.cardListVariantContent }>
          <div>
            <div className={ classes.spaceBetweenContent }>
              <Typography variant="h4">
                { searchHound.name }
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions>
        { onDeleteClick &&
          <Button
            variant="text"
            color="secondary"
            onClick={ event => {
                event.stopPropagation();
                onDeleteClick(searchHound);
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

export default withStyles(styles)(HoundListItem);