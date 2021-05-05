import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { signedLogin } from "../../actions/auth";
import { setLocale } from "../../actions/locale";
import { AccessToken, SignedToken, ActionButton } from "../../types";
import { KeycloakInstance } from "keycloak-js";
import { History } from "history";
import { withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/user-action-buttons";
import strings from "../../localization/strings";
import RegistrationFormDialog from "./registration-form-dialog";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuButton from "./menu-button";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  signedLogin?: typeof signedLogin;
  history: History;
}

/**
 * Interface describing component state
 */
interface State {
  registrationDialogOpen: boolean;
}

/**
 * Component for user action buttons
 *
 * @param props component props
 */
class UserActionButtons extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      registrationDialogOpen: false,
    };
  }

  /**
   * Component render
   */
  public render = () => {
    const { classes, keycloak, signedToken , history } = this.props;
    const { registrationDialogOpen } = this.state;

    if (signedToken) {
      return (
        <div className={ classes.root }>
          { keycloak &&
            <MenuButton
              icon={ <AccountCircleIcon color="primary" /> }
              menuOptions={
                this.getLoggedInMenuOptions(keycloak, history)
              }
            />
          }
        </div>
      );
    }

    return (
      <div className={ classes.root }>
        <RegistrationFormDialog
          open={ registrationDialogOpen }
          onClose={ this.toggleRegistrationDialog }
        />
        { keycloak &&
          <MenuButton
            icon={ <AccountCircleIcon color="primary" /> }
            menuOptions={
              this.getLoginMenuOptions(keycloak)
            }
          />
        }
      </div>
    );
  }

  /**
   * Gets menu options for non-logged-in user
   *
   * @param keycloak keycloack instance
   * @returns menu options as action button array
   */
  private getLoginMenuOptions = (keycloak: KeycloakInstance): ActionButton[] => {
    return [{
      name: strings.user.login,
      action: () => keycloak.login()
    },
    { 
      name: strings.user.register,
      action: () => this.setState({ registrationDialogOpen: !this.state.registrationDialogOpen })
    }
    ];
  }

  /**
   * Gets menu options for logged-in user
   *
   * @param keycloak keycloack instance
   * @returns menu options as action button array
   */
  private getLoggedInMenuOptions = (keycloak: KeycloakInstance, history: History): ActionButton[] => {
    return [{
      name: strings.user.logout,
      action: () => keycloak.logout()
    },
    { 
      name: strings.user.account,
      action: () => history.push("/user")
    }
    ];
  }

  /**
   * Toggles registration dialog
   */
  private toggleRegistrationDialog = () =>
    this.setState({ registrationDialogOpen: !this.state.registrationDialogOpen });
  }

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    locale: state.locale.locale,
    signedToken: state.auth.signedToken,
    anonymousToken: state.auth.anonymousToken,
    keycloak: state.auth.keycloak
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: Dispatch<ReduxActions>) {
  return {
    setLocale: (locale: string) => dispatch(setLocale(locale)),
    login: (signedToken: SignedToken) => dispatch(signedLogin(signedToken))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserActionButtons));
