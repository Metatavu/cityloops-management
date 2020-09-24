import * as React from "react";

import { Hidden, IconButton, Typography, withStyles, WithStyles } from "@material-ui/core";
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
 * Functional component for banner image
 * 
 * @param props component props
 */
const Banner: React.FC<Props> = ({ classes, image, title }) => {
  /**
   * Component render
   */
  return (
    <div
      className={ classes.root }
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      { title &&
        <Hidden mdUp>
          <Typography
            variant="h3"
            className={ classes.title }
          >
            { title }
            <IconButton style={{ padding: 0 }}>
              <ChevronRightIcon className={ classes.chevron } />
            </IconButton>
          </Typography>
        </Hidden>
      }
    </div>
  );
}

export default withStyles(styles)(Banner);