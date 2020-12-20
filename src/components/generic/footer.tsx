import * as React from "react";

import { Container, Hidden, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/footer";
import logoWhite from "../../resources/svg/logo-white.svg";

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
      <Container fixed disableGutters>
        <Hidden mdUp>
          <img
            alt="logo"
            src={ logoWhite }
            width={ 250 }
          />
        </Hidden>
      </Container>
    </div>
  );
}

export default withStyles(styles)(Footer);