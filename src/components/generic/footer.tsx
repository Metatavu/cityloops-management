import * as React from "react";

import { Container, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/footer";
import logoWhite from "../../resources/svg/logo-white.svg";
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
  const { classes } = props;

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <Container className={ classes.content } disableGutters>
        <img
          className={ classes.logo }
          alt="logo"
          src={ logoWhite }
          width={ 250 }
        />
        <Typography
          className={ classes.privacyStatement }
          onClick={ () => window.open(privacyPolicyPDF, "_blank") }
        >
          { strings.privacyStatement }
        </Typography>
      </Container>
      <Typography className={ classes.copyright }>
        { strings.copyRight }
      </Typography>
    </div>
  );
}

export default withStyles(styles)(Footer);