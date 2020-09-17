import * as React from "react";

import { IconButton, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/banner-image";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/**
 * Interface describing component properties
 */
export interface Props extends WithStyles<typeof styles> {
  image: string;
  title?: string;
}

/**
 * Functional component for app footer
 * 
 * @param props component props
 */
const Banner: React.FC<Props> = ({ classes, image, title }) => {
  return (
    <div className={ classes.root }>
      <img src={ image } className={ classes.image } alt="banner" />
      { title &&
        <Typography
          variant="h3"
          className={ classes.title }
        >
          { title }
          <IconButton style={{ padding: 0 }}>
            <ChevronRightIcon className={ classes.chevron } />
          </IconButton>
        </Typography>
      }
    </div>
  );
}

export default withStyles(styles)(Banner);