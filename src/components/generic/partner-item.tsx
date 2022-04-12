import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/partner-item";

/**
 * Interface describing component properties
 */
export interface Props extends WithStyles<typeof styles> {
  logo: string;
  url: string;
  altText: string;
}

/**
 * Functional component for partner item
 *
 * @param props component props
 */
const PartnerItem: React.FC<Props> = ({
    classes,
    logo,
    url,
    altText
  }) => {
  /**
   * Component render
   */
  return (
    <a
      className={ classes.root }
      href={ url }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={ classes.imageContainer }>
        <img alt={ altText } src={ logo } />
      </div>
    </a>
  );
};

export default withStyles(styles)(PartnerItem);
