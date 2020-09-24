import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setLocale } from "../../actions/locale";
import { AccessToken } from "../../types";
import { KeycloakInstance } from "keycloak-js";

import { AppBar, Button, Container, Hidden, IconButton, MenuItem, Select, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/header";
import strings from "../../localization/strings";
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logoPrimary from "../../resources/svg/logo-primary.svg";
import theme from "../../styles/theme";

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
  keycloak?: KeycloakInstance;
  accessToken?: AccessToken;
  locale: string;
  setLocale: typeof setLocale;
  title?: string;
  toggleSideMenu: () => void;
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
    classes,
    title,
    onAddClick,
    onSaveClick,
    toggleSideMenu,
    keycloak,
    accessToken,
    setLocale
  } = props;

  /**
   * Renders mobile app bar content
   */
  const renderMobileContent = () => {
    return (
      <>
        <IconButton edge="start" onClick={ toggleSideMenu }>
          <MenuIcon fontSize="large" style={{ color: "#fff" }} />
        </IconButton>
        { title &&
          <Typography variant="h6">
            { title }
          </Typography>
        }
        <IconButton style={{ marginLeft: "auto" }} onClick={ onAddClick && onAddClick }>
          <AddCircleOutlineIcon fontSize="large" style={{ color: "#fff" }}/>
        </IconButton>
        <IconButton>
          <SearchIcon fontSize="large" style={{ color: "#fff" }} />
        </IconButton>
      </>
    );
  }

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
        />
        <Button className={ classes.menuButton }>
          { strings.categories.movables }
        </Button>
        <Button className={ classes.menuButton }>
          { strings.categories.buildingMaterials }
        </Button>
        <Button className={ classes.menuButton }>
          { strings.categories.soilAndRockMaterials }
        </Button>

        { /* TODO: Add proper display handling */ }
        <IconButton
          style={{ marginLeft: "auto", display: onAddClick ? "block" : "none" }}
          onClick={ onAddClick && onAddClick }
        >
          <AddCircleOutlineIcon fontSize="large" style={{ color: "#fff" }}/>
        </IconButton>
        <IconButton style={{ marginLeft: "auto" }} onClick={ onSaveClick && onSaveClick }>
          <SaveIcon fontSize="large" style={{ color: "#fff" }}/>
        </IconButton>
        { renderAccountSection() }
      </Container>
    );
  }

  /**
   * Renders account section of the app bar
   */
  const renderAccountSection = () => {
    if (!keycloak || !accessToken) {
      return (
        <div className={ classes.accountSection }>
          { renderLanguageSelection() }
          <Button
            className={ classes.menuButton }
            style={{ color: theme.palette.secondary.main }}
          >
            { strings.user.login }
          </Button>
        </div>
      );
    }

    return (
      <div className={ classes.accountSection }>
        <Button
          variant="outlined"
          className={ classes.menuButtonOutlined }
        >
          { strings.items.addPosting }
        </Button>
        { renderLanguageSelection() }
        <IconButton className={ classes.imageButton }>
          <MailOutlineIcon />
        </IconButton>
        <IconButton className={ classes.imageButton }>
          <AccountCircleIcon htmlColor={ theme.palette.secondary.main } />
        </IconButton>
      </div>
    );
  }

  /**
   * Renders language selection
   */
  const renderLanguageSelection = () => {
    return (
      <Select
        className={ classes.languageSelect }
        value={ strings.getLanguage() }
        onChange={ (event) => setLocale(event.target.value as string) }
      >
      {
        strings.getAvailableLanguages().map(language =>
          <MenuItem key={ language } value={ language }>
            { language }
          </MenuItem>
        )
      }
      </Select>
    )
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <AppBar position="fixed" className={ classes.appBar }>
        <Toolbar>
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
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    locale: state.locale.locale,
    accessToken: state.auth.accessToken
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