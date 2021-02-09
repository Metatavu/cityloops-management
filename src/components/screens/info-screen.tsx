import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";

import { History } from "history";
import styles from "../../styles/components/screens/info-screen";
import { Box, CircularProgress, Link, Typography, WithStyles, withStyles } from "@material-ui/core";
import { KeycloakInstance } from "keycloak-js";
import { AccessToken, SignedToken } from "../../types";
import { Category, Item } from "../../generated/client";
import AppLayout from "../layouts/app-layout";
import strings from "../../localization/strings";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  history: History;
  keycloak?: KeycloakInstance;
  anonymousToken?: AccessToken;
  signedToken?: SignedToken;
  locale: string;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  formOpen: boolean;
  categories: Category[];
  items: Item[];
  mtToken?: string | null;
  successDialogOpen: boolean;
  itemId?: string;
  isGrid: boolean;
}

/**
 * Component for info screen
 */
export class InfoScreen extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      formOpen: false,
      categories: [],
      items: [],
      successDialogOpen: false,
      isGrid: true
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
  }

  /**
   * Component render method
   */
  public render = () => {
    const { history } = this.props;

    return (
      <AppLayout
        banner={ true }
        headerProps={{
        }}
        mobileDrawerProps={{
          title: this.props.signedToken?.firstName
        }}
        history={ history }
      >
        { this.renderLayoutContent() }
      </AppLayout>
    );
  }

  /**
   * Renders layout content
   */
  private renderLayoutContent = () => {
    const { classes } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div className={ classes.loader }>
          <CircularProgress size={ 40 } color="secondary" />
        </div>
      );
    }

    return (
      <Box mt={ 2 } className={ classes.root }>
        <Typography variant="h1" className={ classes.title  }>{ strings.info.title }</Typography>
        <Box mt={ 2 } mb={ 2 }>
          <Typography>
            { strings.info.first }
          </Typography>
          <Typography>
            { strings.info.second }
          </Typography>
          <Typography>
            { strings.info.third }
            <Link
            href="https://mikseimikkeli.fi/hankkeet/cityloops-kaupunkien-materiaalivirtojen-silmukan-sulkeminen/"
            target="_blank"
            >
              { strings.info.thisLink }
            </Link>
          </Typography>
        </Box>
        <Box mt={ 4 } mb={ 2 }>
          <Typography variant="h4">
            { strings.info.fourth }
          </Typography>
          { this.renderLink(strings.info.companies.materiaalitori, "https://materiaalitori.fi/") }
          { this.renderLink(strings.info.companies.purkutori, "http://purkutori.fi/") }
          { this.renderLink(strings.info.companies.purkukolmio, "https://www.purkukolmio.fi/kauppa") }
          { this.renderLink(strings.info.companies.kiertonet, "https://kiertonet.fi/") }
        </Box>
      </Box>
    );
  }
  
  /**
   * Render link method
   * 
   * @param label 
   * @param address 
   */
  private renderLink = (label: string, address: string) => {
    return (
      <Box mt={ 1 }>
        <Link
          href={ address }
          target="_blank"
          >
          <Typography>
            { label }
          </Typography>
        </Link>
      </Box>
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
    keycloak: state.auth.keycloak,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoScreen));
