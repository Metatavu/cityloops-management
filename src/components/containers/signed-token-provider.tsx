import * as React from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxState, ReduxActions } from "../../store";
import { signedLogin } from "../../actions/auth";

import { AccessToken } from "../../types";
import ErrorDialog from "../generic/error-dialog";
import { KeycloakInstance } from "keycloak-js";
import Keycloak from "keycloak-js";

/**
 * Component props
 */
interface Props {
  signedToken?: AccessToken;
  onSignedLogin: typeof signedLogin;
}

/**
 * Component state
 */
interface State {
  error?: Error;
}

/**
 * Component providing signed token and keeping it fresh
 */
class SignedTokenProvider extends React.Component<Props, State> {

  private keycloak: KeycloakInstance;
  private timer?: any;

  /**
   * Constructor
   *
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.keycloak = Keycloak({
      url: process.env.REACT_APP_KEYCLOAK_URL,
      realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || ""
    });

    this.state = {

    };
  }

  /**
   * Component did mount life cycle event
   */
  public componentDidMount = async () => {
    const auth = await this.keycloakInit();

    if (!auth) {
      window.location.reload();
    } else {
      const { token, tokenParsed } = this.keycloak;

      if (this.keycloak && tokenParsed && tokenParsed.sub && token) {
        this.keycloak.loadUserProfile();
        const signedToken = this.buildToken(this.keycloak);
        if (signedToken) {
          this.props.onSignedLogin(this.keycloak, signedToken);
        }
      }

      this.refreshAccessToken();

      this.timer = setInterval(() => {
        this.refreshAccessToken();
      }, 1000 * 60);
    }
  }

  /**
   * Component will unmount life cycle event
   */
  public componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { signedToken, children } = this.props;
    const { error } = this.state;

    if (error) {
      return <ErrorDialog error={ error } onClose={ () => this.setState({ error: undefined }) } />;
    }

    return signedToken ? children : null;
  }

  /**
   * Refreshes access token
   */
  private refreshAccessToken() {
    try {
      const refreshed = this.keycloak.updateToken(70);
      if (refreshed) {
        const signedToken = this.buildToken(this.keycloak);

        if (signedToken) {
          this.props.onSignedLogin(this.keycloak, signedToken);
        }
      }
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }

  /**
   * Initializes Keycloak client
   */
  private keycloakInit = () => {
    return new Promise(resolve => {
      this.keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).success(resolve);
    });
  }

  /**
   * Builds access token using Keycloak instance
   * 
   * @param keycloak Keycloak instance
   * @returns access token or undefined if building fails
   */
  private buildToken = (keycloak: KeycloakInstance): AccessToken | undefined => {
    const { token, tokenParsed, refreshToken, refreshTokenParsed, profile } = keycloak;

    if (!tokenParsed || !tokenParsed.sub || !token) {
      return undefined;
    }
    
    const created = new Date();      

    return {
      created: created,
      access_token: token,
      expires_in: tokenParsed.exp,
      refresh_token: refreshToken,
      refresh_expires_in: refreshTokenParsed?.exp,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      userId: tokenParsed.sub
    };
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
function mapStateToProps(state: ReduxState) {
  return {
    signedToken: state.auth.signedToken
  };
}

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
function mapDispatchToProps(dispatch: Dispatch<ReduxActions>) {
  return {
    onSignedLogin: (keycloak: KeycloakInstance, signedToken: AccessToken) => dispatch(signedLogin(keycloak, signedToken))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedTokenProvider);
