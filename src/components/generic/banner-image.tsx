import * as React from "react";

import { Hidden, IconButton, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/banner-image";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PartnerItem from "../generic/partner-item";
import kieppiLogo from "../../resources/images/kieppi_logo.png";
import metsasairilaLogo from "../../resources/images/metsasairila.png";
import materiaalitoriLogo from "../../resources/images/materiaalitori.svg";

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
        backgroundImage: `url(${ image })`
      }}
    >
    <Hidden smDown>
      <div className={ classes.partners }>
        <PartnerItem 
          logo={ kieppiLogo }
          url="https://www.kierratyskieppi.fi/"
          altText="Kierrätys kieppi"
        />
        <PartnerItem
          logo={ metsasairilaLogo }
          url="https://www.metsasairila.fi/"
          altText="Metsäsairila"
        />
        <PartnerItem
          logo={ materiaalitoriLogo }
          url="https://materiaalitori.fi/"
          altText="Materiaalitori"
        />
      </div>
    </Hidden>
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
};

export default withStyles(styles)(Banner);