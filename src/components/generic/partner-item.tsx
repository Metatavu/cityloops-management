import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/partner-item";

/**
 * Interface describing component properties
 */
export interface Props extends WithStyles<typeof styles> {
  logo: string;
  title?: string;
}

/**
 * Functional component for partner item
 *
 * @param props component props
 */
const PartnerItem: React.FC<Props> = ({ classes, logo }) => {
  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <div className={ classes.imageContainer }>
        <img alt="Partner logo" src={ logo } />
      </div>
      <div className={ classes.buttonContainer }>
      </div>
    </div>
  );
};

export default withStyles(styles)(PartnerItem);
