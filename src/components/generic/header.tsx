import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setLocale } from "../../actions/locale";
import { AccessToken, SignedToken } from "../../types";

import { AppBar, Box, Button, Container, Hidden, IconButton, MenuItem, Select, Toolbar, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/header";
import strings from "../../localization/strings";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import logoPrimary from "../../resources/svg/logo-primary.svg";
import logoSecondary from "../../resources/svg/logo-white.svg";
import UserActionButtons from "./user-action-buttons";
import { History } from "history";
import MobileDrawer from "../generic/mobile-drawer";
import logo from "../../resources/svg/logo-primary.svg";
import { ScreenProps as MobileDrawerProps } from "../generic/mobile-drawer";
import AddIcon from "@material-ui/icons/Add"

/**
 * Interface describing properties from screen components
 */
export interface ScreenProps {
  onAddClick?: () => void;
  onSaveClick?: () => void;
  onAddItemClick?: () => void;
}

/**
 * Interface describing other component properties
 */
interface OtherProps extends WithStyles<typeof styles> {
  mobileDrawerProps?: MobileDrawerProps;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  locale: string;
  setLocale: typeof setLocale;
  title?: string;
  history: History;
}

/**
 * Intersection type for all component properties
 */
type Props = ScreenProps & OtherProps;

/**
 * Functional component for app header
 *
 * @param props component props
 */
const Header: React.FC<Props> = props => {
  const {
    signedToken,
    classes,
    onAddClick,
    onSaveClick,
    setLocale,
    history,
    mobileDrawerProps
  } = props;

  const [ sideMenuOpen, toggleSideMenu ] = React.useState(false);
  const toggle = () => toggleSideMenu(!sideMenuOpen);

  /**
   * Renders mobile app bar content
   */
  const renderMobileContent = () => {
    return (
      <>
        <Box display={ "flex" } alignItems={ "center" }>
          <img
            alt="logo"
            src={ logoSecondary }
            className={ classes.mobileLogo }
            onClick={ () => history.push("/") }
          />
          { signedToken &&
            onAddClick &&
              <Button
                startIcon={ <AddIcon /> }
                color="inherit"
                variant="outlined"
                className={ classes.menuButton }
                onClick={ onAddClick }
              >
              { strings.items.addPosting }
            </Button>
          }
        </Box>
        <MobileDrawer
          logoUrl={ logo }
          open={ sideMenuOpen }
          toggleSideMenu={ toggle }
          { ...mobileDrawerProps }
          history={ history }
        />
        <IconButton edge="end" onClick={ toggle }>
          <MenuIcon fontSize="default" style={{ color: "#fff" }} />
        </IconButton>
      </>
    );
  };

  /**
   * Renders desktop app bar content
   */
  const renderDesktopContent = () => {
    return (
      <Container
        fixed
        disableGutters
        className={ classes.desktopContent }
      >
        <img
          alt="logo"
          src={ logoPrimary }
          className={ classes.logo }
          onClick={ () => history.push("/") }
          />
        { onSaveClick &&
          <IconButton style={{ marginLeft: "auto" }} onClick={ onSaveClick && onSaveClick }>
            <SaveIcon fontSize="large" style={{ color: "#fff" }}/>
          </IconButton>
        }
        { renderAccountSection() }
      </Container>
    );
  };

  /**
   * Renders account section of the app bar
   */
  const renderAccountSection = () => {

    return (
      <div className={ classes.accountSection }>
        { renderLanguageSelection() }
        { signedToken &&
          onAddClick &&
            <Button
              variant="outlined"
              className={ classes.menuButtonOutlined }
              onClick={ onAddClick }
            >
            { strings.items.addPosting }
          </Button>
        }
        <Box ml={ 2 }>
          <UserActionButtons history={ history } />
        </Box>
      </div>
    );
  };

  /**
   * Renders language selection
   */
  const renderLanguageSelection = () => {
    return (
      <Select
        className={ classes.languageSelect }
        value={ strings.getLanguage() }
        onChange={ event => setLocale(event.target.value as string) }
      >
      {
        strings.getAvailableLanguages().map(language =>
          <MenuItem key={ language } value={ language }>
            { language }
          </MenuItem>
        )
      }
      </Select>
    );
  };

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <AppBar position="fixed" className={ classes.appBar }>
        <Toolbar className={ classes.toolbar }>
          <Hidden mdUp>
            { renderMobileContent() }
          </Hidden>
          <Hidden smDown>
            { renderDesktopContent() }
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    anonymousToken: state.auth.anonymousToken,
    signedToken: state.auth.signedToken,
    locale: state.locale.locale
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: Dispatch<ReduxActions>) {
  return {
    setLocale: (locale: string) => dispatch(setLocale(locale))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));