import * as React from "react";

import { connect } from "react-redux";
import { ReduxState, ReduxActions } from "../../store";
import { Dispatch } from "redux";
import { AccessToken, SignedToken } from "../../types";
import ErrorDialog from "../generic/error-dialog";
import { KeycloakInstance } from "keycloak-js";

/**
 * Component props
 */
interface Props {
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
}

/**
 * Component state
 */
interface State {
  error?: Error;
}

/**
 * Component for fetching initial data
 */
class StoreInitializer extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props props
   */
  constructor(props: Props) {
    super(props);
    this.state = { };
  }

  /**
   * Component did mount life cycle event
   */
  public componentDidMount = async () => {
    try {
      // TODO: Initialize all needed data here
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }

  /**
   * Component render method
   */
  public render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <ErrorDialog
          error={ error }
          onClose={ () => this.setState({ error: undefined }) }
        />
      );
    }

    return (
      children || null
    );
  }
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInitializer);