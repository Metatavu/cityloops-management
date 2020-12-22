import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setLocale } from "../../actions/locale";
import { AccessToken, SignedToken } from "../../types";

import { AppBar, Button, Container, Hidden, IconButton, MenuItem, Select, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/header";
import strings from "../../localization/strings";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logoPrimary from "../../resources/svg/logo-primary.svg";
import theme from "../../styles/theme";
import UserActionButtons from "./user-action-buttons";
import { History } from "history";

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
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  locale: string;
  setLocale: typeof setLocale;
  title?: string;
  toggleSideMenu: () => void;
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
    title,
    onAddClick,
    onSaveClick,
    toggleSideMenu,
    setLocale,
    history
  } = props;

  /**
   * Renders mobile app bar content
   */
  const renderMobileContent = () => {
    return (
      <div className={ classes.mobileToolbarContent }>
        <IconButton edge="start" onClick={ toggleSideMenu }>
          <MenuIcon fontSize="default" style={{ color: "#fff" }} />
        </IconButton>
        { title &&
          <Typography variant="h6">
            { title }
          </Typography>
        }
        { renderAccountSection(true) }
      </div>
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
        { renderAccountSection(false) }
      </Container>
    );
  };

  /**
   * Renders account section of the app bar
   *
   * @param mobile mobile view
   */
  const renderAccountSection = (mobile: boolean) => {
    if (!signedToken) {
      return (
        <div className={ classes.accountSection }>
          <UserActionButtons />
        </div>
      );
    }

    const addElement = mobile ?
      <Button
        color="inherit"
        startIcon={<AddCircleOutlineIcon fontSize="small" style={{ color: "#fff" }}/>}
        style={{ marginRight: theme.spacing(2) }}
        onClick={ onAddClick }
      >
        { strings.items.addPosting }
      </Button> :
      <Button
        variant="outlined"
        className={ classes.menuButtonOutlined }
        onClick={ onAddClick }
      >
        { strings.items.addPosting }
      </Button>;

    return (
      <div className={ classes.accountSection }>
        { onAddClick && addElement }
        <Hidden mdUp>
          <IconButton
            onClick={ () => history.push("/user") }
            className={ classes.imageButton }
          >
            <AccountCircleIcon htmlColor={ "#fff" } />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <IconButton
            onClick={ () => history.push("/user") }
            className={ classes.imageButton }
          >
            <AccountCircleIcon htmlColor={ theme.palette.secondary.main } />
          </IconButton>
        </Hidden>
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
