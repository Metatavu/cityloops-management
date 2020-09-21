import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/footer";

/**
 * Interface describing component properties
 */
export interface FooterProps extends WithStyles<typeof styles> {
}

/**
 * Functional component for app footer
 * 
 * @param props component props
 */
const Footer: React.FC<FooterProps> = props => {
  const { classes } = props;

  return (
    <div className={ classes.root }>
    </div>
  );
}

export default withStyles(styles)(Footer);