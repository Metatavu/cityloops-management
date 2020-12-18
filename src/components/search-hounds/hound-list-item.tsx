import { Button, ListItem, ListItemSecondaryAction, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { SearchHound } from "../../generated/client";
import strings from "../../localization/strings";
import styles from "../../styles/components/search-hounds/hound-list-item";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  selected?: boolean;
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
    selected,
    searchHound,
    style,
    onClick,
    onDeleteClick
  } = props;

  /**
   * Component render
   */
  return (
    <ListItem
      key={ searchHound.id }
      button
      selected={ selected }
      onClick={ () => onClick(searchHound) }
      style={ style }
    >
      <ListItemText primary={ searchHound.name } />
      { onDeleteClick &&
        <ListItemSecondaryAction>
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
        </ListItemSecondaryAction>
      }
    </ListItem>
  );
};

export default withStyles(styles)(HoundListItem);