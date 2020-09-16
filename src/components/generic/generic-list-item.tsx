import * as React from "react";
import { WithStyles, withStyles, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import styles from "../../styles/components/generic/generic-button";
import { Item } from "../../generated/client";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  item: Item;
  onClick: (item: Item) => void;
  style?: CSSProperties;
}

/**
 * React generic list item functional component
 */
const GenericListItem: React.FC<Props> = props => {
  const { item, onClick, style } = props;

  return(
    <div>
      <ListItem
        button
        onClick={ () => onClick(item) }
        style={ style }
      >
        <ListItemAvatar>
          <img
            alt={ `itemImage-${item.id}` }
            src="https://staging-muisti-cdn.metatavu.io/folder/f2d54335-2015-4ccc-8ac2-d4c113b05dc6.jpg"
            style={{ width: 100, height: 100 }}
          />
        </ListItemAvatar>
        <Typography
          variant="h4"
        >
          { item.title }
        </Typography>
      </ListItem>
    </div>
  );

};

export default withStyles(styles)(GenericListItem);
