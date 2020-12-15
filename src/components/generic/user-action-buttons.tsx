import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { signedLogin } from "../../actions/auth";
import { setLocale } from "../../actions/locale";
import { AccessToken, SignedToken } from "../../types";
import { KeycloakInstance } from "keycloak-js";

import { Button, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/user-action-buttons";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import RegistrationFormDialog from "./registration-form-dialog";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  signedLogin?: typeof signedLogin;
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
    const { classes, keycloak, signedToken } = this.props;
    const { registrationDialogOpen } = this.state;

    if (signedToken) {
      return (
        <div className={ classes.root }>
          <Button
            className={ classes.popoverButton }
            style={{ color: theme.palette.secondary.main }}
            // TODO: Add proper error handling
            onClick={ () => keycloak?.logout() || console.log("Missing keycloak instance") }>
            { strings.user.logout }
          </Button>
        </div>
      );
    }

    return (
      <div className={ classes.root }>
        <Button
          className={ classes.popoverButton }
          style={{ color: theme.palette.secondary.main }}
          onClick={ this.toggleRegistrationDialog }
        >
          { strings.user.register }
        </Button>
        <RegistrationFormDialog
          open={ registrationDialogOpen }
          onClose={ this.toggleRegistrationDialog }
        />
        <Button
          className={ classes.popoverButton }
          style={{ color: theme.palette.secondary.main }}
          // TODO: Add proper error handling
          onClick={ () => keycloak?.login() || console.log("Missing keycloak instance") }>
          { strings.user.login }
        </Button>
      </div>
    );
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
