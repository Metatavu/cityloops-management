import * as React from "react";

import { ReduxActions, ReduxState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { signedLogin } from "../../actions/auth";
import { setLocale } from "../../actions/locale";
import { AccessToken, LoginInfo } from "../../types";
import { KeycloakInstance } from "keycloak-js";

import { Button, Popover, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/login-button";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import RegistrationFormDialog from "./registration-form-dialog";
import OutlinedTextField from "./outlined-text-field";
import { CheckBox } from "@material-ui/icons";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: AccessToken;
  signedLogin?: typeof signedLogin;
}

/**
 * Interface describing component state
 */
interface State {
  popoverAnchorElement?: HTMLButtonElement;
  registrationDialogOpen: boolean;
  loginInfo: LoginInfo;
}

/**
 * Component for login button
 * 
 * @param props component props
 */
class LoginButton extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      registrationDialogOpen: false,
      loginInfo: {}
    };
  }

  /**
   * Component render
   */
  public render = () => {
    const { classes } = this.props;
    const {
      popoverAnchorElement,
      registrationDialogOpen
    } = this.state;

    return (
      <div className={ classes.root }>
        <Button
          className={ classes.popoverButton }
          style={{ color: theme.palette.secondary.main }}
          onClick={ this.openLogin }
        >
          { strings.user.login }
        </Button>
        <Popover
          id="login-popover"
          open={ !!popoverAnchorElement }
          anchorEl={ popoverAnchorElement }
          onClose={ this.closeLogin }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          className={ classes.popover }
          PaperProps={{
            square: true,
            className: classes.popoverContent
          }}
        >
          { this.renderLoginContent() }
        </Popover>
        <RegistrationFormDialog
          open={ registrationDialogOpen }
          onClose={ this.toggleRegistrationDialog }
        />
      </div>
    );
  }

  /**
   * Renders login content
   */
  private renderLoginContent = () => {
    const { classes } = this.props;
    const { loginInfo } = this.state;
    return (
      <>
        <OutlinedTextField
          key="username"
          label={ strings.user.username }
          value={ loginInfo.username || "" }
          onChange={ this.onChangeLoginInfo("username") }
          className={ classes.loginRow }
        />
        <OutlinedTextField
          key="password"
          label={ strings.user.username }
          value={ loginInfo.password || "" }
          onChange={ this.onChangeLoginInfo("password") }
          className={ classes.loginRow }
        />
        <div className={ classes.loginRow }>
          <CheckBox
            color="secondary"
            fontSize="large"
          />
          <Typography variant="body1">
            { strings.user.rememberMe }
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={ classes.loginButton }
            onClick={ this.submitLogin }
          >
            { strings.user.loginShort }
          </Button>
        </div>
        <Button
          variant="text"
          className={ classes.registerButton }
          onClick={ () => {
            this.toggleRegistrationDialog();
            this.closeLogin();
          }}
        >
          { strings.user.register }
        </Button>
        <Button
          variant="text"
          className={ classes.forgotPasswordButton }
        >
          { strings.user.forgotPassword }
        </Button>
      </>
    );
  }

  /**
   * Opens login popover
   * 
   * @param event react mouse event
   */
  private openLogin = (event: React.MouseEvent<HTMLButtonElement>) =>
    this.setState({ popoverAnchorElement: event.currentTarget });

  /**
   * Closes login popover
   */
  private closeLogin = () =>
    this.setState({ popoverAnchorElement: undefined });

  /**
   * Toggles registration dialog
   */
  private toggleRegistrationDialog = () =>
    this.setState({ registrationDialogOpen: !this.state.registrationDialogOpen });

  /**
   * Event handler for change login info
   */
  private onChangeLoginInfo = (propertyKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      loginInfo: { ...this.state.loginInfo, [propertyKey]: event.target.value }
    });
  }

  /**
   * Submits login form
   * 
   * TODO:
   * Add login functionality
   */
  private submitLogin() { }
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
    login: (keycloak: KeycloakInstance, signedToken: AccessToken) => dispatch(signedLogin(keycloak, signedToken))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginButton));
