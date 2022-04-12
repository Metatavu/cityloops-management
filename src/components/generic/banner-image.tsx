import * as React from "react";

import { Box, Hidden, IconButton, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/banner-image";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PartnerItem from "../generic/partner-item";
import uuttaElamaaLogo from "../../resources/images/toimintakeskus.png";
import metsasairilaLogo from "../../resources/images/metsasairila.png";
import materiaalitoriLogo from "../../resources/images/materiaalitori.svg";
import strings from "../../localization/strings";
import theme from "../../styles/theme";

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
      <Box mb={ 4 }>
        <Paper
          style={{
            padding: theme.spacing(2),
            maxWidth: 1280,
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(4px)"
          }}
        >
          <Typography variant="h5">
            { strings.siteDescription }
          </Typography>
        </Paper>
      </Box>
    <Hidden smDown>
      <div className={ classes.partners }>
        <PartnerItem 
          logo={ uuttaElamaaLogo }
          url="https://www.uuttaelamaa.fi/"
          altText="Uutta elämää"
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
        <PartnerItem
          title="Kierrätä vanha hirsirakennus uudelleen käyttöön."
          url="https://ecosairila.fi/kuluttajille/hirsirakennusten-kiertotalous/"
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