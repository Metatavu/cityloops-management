import { Container, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import styles from "../../styles/components/layouts/app-layout";
import Header from "../generic/header";
import { ScreenProps as HeaderProps } from "../generic/header";
import Footer from "../generic/footer";
import { ScreenProps as FooterProps } from "../generic/footer";
import MobileDrawer from "../generic/mobile-drawer";
import { ScreenProps as MobileDrawerProps } from "../generic/mobile-drawer";
import BannerImage from "../generic/banner-image";
import bannerImageSrc from "../../resources/images/banner-image.jpg";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  title?: string;
  headerProps?: HeaderProps;
  mobileDrawerProps?: MobileDrawerProps;
  footerProps?: FooterProps;
  banner: boolean;
}

/**
 * Functional component for app layout
 * 
 * @param props component props
 */
const AppLayout: React.FC<Props> = props => {
  const {
    title,
    children,
    classes,
    headerProps,
    mobileDrawerProps,
    footerProps,
    banner
  } = props;

  const [ sideMenuOpen, toggleSideMenu ] = React.useState(false);
  const toggle = () => toggleSideMenu(!sideMenuOpen);

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <Header
        title={ title }
        toggleSideMenu={ toggle }
        { ...headerProps }
      />
      <MobileDrawer
        open={ sideMenuOpen }
        toggleSideMenu={ toggle }
        { ...mobileDrawerProps }
      />
      { banner &&
        <BannerImage
        image={ bannerImageSrc }
        />
      }
      <Container
        maxWidth="lg"
        fixed
        disableGutters
        className={ classes.contentWrapper }
      >
        { children ?? <div></div> }
      </Container>

      <Footer { ...footerProps } />
    </div>
  );
}

export default withStyles(styles)(AppLayout);