import * as React from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxState, ReduxActions } from "../../store";
import { setKeycloak, signedLogin } from "../../actions/auth";

import { AccessToken, SignedToken } from "../../types";
import ErrorDialog from "../generic/error-dialog";
import Keycloak from "keycloak-js";

/**
 * Component props
 */
interface Props {
  signedToken?: SignedToken;
  onSignedLogin: typeof signedLogin;
  setKeycloak: typeof setKeycloak;
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

  private keycloak: Keycloak;
  private timer?: any;

  /**
   * Constructor
   *
   * @param props props
   */
  constructor(props: Props) {
    super(props);

    this.keycloak = new Keycloak({
      url: process.env.REACT_APP_KEYCLOAK_URL,
      realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || ""
    });

    this.state = {

    };
  }

  /**
   * Component did mount life cycle event
   */
  public componentDidMount = async () => {
    const auth = await this.keycloakInit();
    this.props.setKeycloak(this.keycloak);
    if (auth) {
      const { token, tokenParsed } = this.keycloak;

      if (this.keycloak && tokenParsed && tokenParsed.sub && token) {
        this.keycloak.loadUserProfile();
        const signedToken = this.buildToken(this.keycloak);
        this.props.onSignedLogin(signedToken ?? null);
      }

      await this.refreshAccessToken();

      this.timer = setInterval(() => {
        this.refreshAccessToken();
      }, 1000 * 60);
    } else {
      this.props.onSignedLogin(null);
    }
  }

  /**
   * Component will unmount life cycle event
   */
  public componentWillUnmount = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { children, signedToken } = this.props;
    const { error } = this.state;

    if (error) {
      return <ErrorDialog error={ error } onClose={ () => this.setState({ error: undefined }) } />;
    }
    return signedToken !== undefined ? children : null;
  }

  /**
   * Refreshes access token
   */
  private refreshAccessToken = async () => {
    try {
      const refreshed = await this.keycloak.updateToken(70);
      if (refreshed) {
        const signedToken = this.buildToken(this.keycloak);

        this.props.onSignedLogin(signedToken ?? null);
      }
    } catch (e) {
      this.setState({
        error: e as any
      });
    }
  }

  /**
   * Initializes Keycloak client
   */
  private keycloakInit = () => {
    return new Promise(resolve => {
      this.keycloak.init({ onLoad:"check-sso", checkLoginIframe: false }).then(resolve);
    });
  }

  /**
   * Builds access token using Keycloak instance
   *
   * @param keycloak Keycloak instance
   * @returns access token or undefined if building fails
   */
  private buildToken = (keycloak: Keycloak): AccessToken | undefined => {
    const {
      token,
      tokenParsed,
      refreshToken,
      refreshTokenParsed,
      profile,
      realmAccess
    } = keycloak;

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
      userId: tokenParsed.sub,
      roles: realmAccess?.roles
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
    onSignedLogin: (signedToken?: SignedToken) => dispatch(signedLogin(signedToken)),
    setKeycloak: (keycloak: Keycloak) => dispatch(setKeycloak(keycloak))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedTokenProvider);