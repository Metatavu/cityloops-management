import * as React from "react";

import { Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/partner-item";

/**
 * Interface describing component properties
 */
export interface Props extends WithStyles<typeof styles> {
  logo?: string;
  url: string;
  altText?: string;
  title?: string;
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
    altText,
    title
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
        { logo &&
          <img alt={ altText } src={ logo } />
        }
        { title &&
          <Typography variant="h5">{ title }</Typography>
        }
      </div>
    </a>
  );
};

export default withStyles(styles)(PartnerItem);
