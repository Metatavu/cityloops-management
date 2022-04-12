import * as React from "react";
import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setLocale } from "../../actions/locale";

import { Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, MenuItem, Select, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import { styles } from "../../styles/components/generic/mobile-drawer";
import strings from "../../localization/strings";
import ListIcon from "@material-ui/icons/List";
import { History } from "history";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import RegisterIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import { AccessToken, SignedToken } from "../../types";
import { KeycloakInstance } from "keycloak-js";
import theme from "../../styles/theme";
import RegistrationFormDialog from "../generic/registration-form-dialog";
import { InfoOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Interface describing properties from screen component
 */
export interface ScreenProps {
  keycloak?: KeycloakInstance;
  title?: string;
  logoUrl?: string;
}

/**
 * Interface describing other properties
 */
interface OtherProps extends WithStyles<typeof styles> {
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  locale: string;
  setLocale: typeof setLocale;
  open: boolean;
  toggleSideMenu: () => void;
  history: History;
}

/**
 * Intersection type for all component properties
 */
type Props = ScreenProps & OtherProps;

/**
 * Mobile drawer component
 * 
 * @param props component props
 */
const MobileDrawer: React.FC<Props> = ({
  keycloak,
  signedToken,
  classes,
  open,
  title,
  logoUrl,
  history,
  setLocale,
  toggleSideMenu,
}) => {

  const [ registrationDialogOpen, toggleRegistrationDialog ] = React.useState(false);
  const toggle = () => toggleRegistrationDialog(!registrationDialogOpen);

  /**
   * Renders drawer content
   */
  const renderDrawerContent = () => {
    return (
      <div className={ classes.drawerContent }>
        <Toolbar style={{ justifyContent: "space-between" }}>
          { logoUrl &&
            <img
              alt="logo"
              src={ logoUrl }
              className={ classes.logo }
            />
          }
          <IconButton
            color="primary"
            edge="end"
            onClick={ toggleSideMenu }
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        { renderLanguageSelection() }
        { title &&
          <Typography
            variant="h3"
            className={ classes.title }
          >
            { title }
          </Typography>
        }
        <List className={ classes.menu }>
          {
            renderListItem(
              strings.items.postings,
              navigateTo,
              { boldText: true, icon: <ListIcon fontSize="small" /> },
              "/items",
            )
          }
          {
            renderListItem(
              strings.info.title,
              navigateTo,
              { boldText: true, icon: <InfoOutlined fontSize="small" /> },
              "/info",
            )
          }
          { signedToken && 
            renderListItem(
              strings.userPage.myInfo,
              navigateTo,
              { boldText: true, icon: <PersonIcon fontSize="small" /> },
              "/user",
            )
          }
          { signedToken && 
            renderListItem(
              strings.user.logout,
              logOut,
              { boldText: true, icon: <SignOutIcon fontSize="small" /> },
              "/user",
            )
          }
          { !signedToken &&
            renderListItem(
              strings.user.login,
              logIn,
              { boldText: true, icon: <AccountCircleIcon fontSize="small" /> },
              "/user",
            )
          }
          { !signedToken &&
            renderListItem(
              strings.user.register,
              toggle,
              { boldText: true, icon: <RegisterIcon fontSize="small" /> },
              "/user",
            )
          }
        </List>
      </div>
    );
  };

  /**
   * Renders language selection
   */
  const renderLanguageSelection = () => {
    return (
      <div style={{ padding: theme.spacing(2) }}>
        <Typography>{ strings.generic.selectLanguage }</Typography>
        <Select
          fullWidth
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
      </div>
    );
  };

  /**
   * Renders list item
   * 
   * @param name item name
   * @param action action that is triggered when list item is clicked
   * @param boldText is item name written in bold
   * @param icon possible icon
   * @param path to navigate
   */
  const renderListItem = (
    name: string,
    action: (path?: string) => void,
    options?: { boldText?: boolean, icon?: JSX.Element },
    path?: string,
  ) => {
    return (
      <ListItem
        button
        className={ classes.listItem }
        onClick={ () => action(path) }
      >
        { options?.icon &&
          <ListItemIcon className={ classes.listIcon }>
            { options.icon }
          </ListItemIcon>
        }
        <Typography
          variant="h6"
          style={{ fontWeight: options?.boldText ? "bold" : "initial" }}
        >
          { name }
        </Typography>
      </ListItem>
    );
  }

  /**
   * Navigates to given path
   *
   * @param path path
   */
  const navigateTo = (path?: string) => {
    if (path) {
      history.push(path);
    }
  }

  /**
   * Log out
   */
  const logOut = () => {
    keycloak?.logout() || console.log("Missing keycloak instance");
  }

  /**
   * Log in
   */
  const logIn = () => {
    keycloak?.login() || console.log("Missing keycloak instance");
  }

  /**
   * Component render
   */
  return (
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="left"
        open={ open }
        onClose={ toggleSideMenu }
        ModalProps={{
          keepMounted: true
        }}
      >
        { renderDrawerContent() }
      </Drawer>
      <RegistrationFormDialog
        open={ registrationDialogOpen }
        onClose={ toggle }
      />
    </Hidden>
  );
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    anonymousToken: state.auth.anonymousToken,
    signedToken: state.auth.signedToken,
    keycloak: state.auth.keycloak,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MobileDrawer));
