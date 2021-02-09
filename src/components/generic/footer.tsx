import * as React from "react";

import { Box, Container, Grid, Link, Typography, withStyles, WithStyles } from "@material-ui/core";
import { History } from "history";
import styles from "../../styles/components/generic/footer";
import logoWhite from "../../resources/svg/logo-white.svg";
import euLogo from "../../resources/svg/eu-logo.svg";
import privacyPolicyPDF from "../../resources/tietosuojaseloste.pdf";
import strings from "../../localization/strings";

/**
 * Interface describing properties from screen component
 */
export interface ScreenProps {
}

/**
 * Interface describing other component properties
 */
export interface OtherProps extends WithStyles<typeof styles> {
  history: History;
}

/**
 * Intersection type for all component properties
 */
type Props = ScreenProps & OtherProps;

/**
 * Functional component for app footer
 * 
 * @param props component props
 */
const Footer: React.FC<Props> = props => {
  const { classes, history } = props;

  const euContent = () => {
    return (
      <Box
        className={ classes.euSection }
        pt={ 12 }
        pb={ 12 }
      >
        <img
          className={ classes.logo }
          alt="logo"
          src={ euLogo }
          width={ 250 }
        />
        <Box className={ classes.euContent }>
          <Box className={ classes.euPart1 }>
            <Typography
              variant="body2"
              className={ classes.footerText }
            >
              { strings.footer.eu.text1 }
            </Typography>
          </Box>
          <Box className={ classes.euPart2 }>
            <Typography
              variant="body2"
              className={ classes.footerText }
            >
              <Typography
                className={ classes.disclaimer }
                variant="subtitle2"
              >
                { strings.footer.eu.disclaimer }
              </Typography>
              { strings.footer.eu.text2 }
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  const cityLoopsContent = () => {
    return (
      <Box
        className={ classes.cityLoopsSection }
        pt={ 8 }
        pb={ 12 }
      >
        <img
          style={{ cursor: "pointer" }}
          className={ classes.logo }
          alt="logo"
          src={ logoWhite }
          width={ 250 }
          onClick={ () => history.push("/") }
        />
        <Box className={ classes.links }>
          <Link
            className={ classes.link }
            onClick={ () => history.push("info") }
          >
            { strings.footer.infoLink }
          </Link>
          <Link
            className={ classes.link }
            onClick={ () => window.open(privacyPolicyPDF, "_blank") }
          >
            { strings.footer.privacyStatement }
          </Link>
        </Box>
      </Box>
    );
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <Container className={ classes.content } disableGutters maxWidth="lg">
        <Box 
          display="flex"
          flexDirection="column"
        >
          { cityLoopsContent() }
          { euContent() }
        </Box>
      </Container>
      <Typography className={ classes.copyright }>
        { strings.footer.copyRight }
      </Typography>
    </div>
  );
}

export default withStyles(styles)(Footer);