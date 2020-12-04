import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";
import { AccessToken } from "../../types";
import strings from "../../localization/strings";
import { History } from "history";
import { Tab, Tabs, Typography, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/user-screen";
import AppLayout from "../layouts/app-layout";

import UserItemsTab from "../tabs/user-items-tab";
import CategoriesProvider from "../categories/categories-provider";
import MyInfoTab from "../tabs/my-info-tab";

import logo from "../../resources/images/toimintakeskus.png";
import Api from "../../api/api";
import { Item } from "../../generated/client";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  signedToken?: AccessToken;
  history: History;
}

/**
 * Component state
 */
interface State {
  loading: boolean;
  tabIndex: number;
  userItems: Item[];
}

/**
 * Component for User screen
 */
export class UserScreen extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      tabIndex: 0,
      userItems: []
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = async () => {
    await this.fetchData();
  }

  /**
   * Component did update life cycle handler
   *
   * @param prevProps previous props
   */
  public componentDidUpdate = async (prevProps: Props) => {
    if (!prevProps.signedToken && this.props.signedToken) {
      await this.fetchData();
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    return (
      <AppLayout
        banner={ false }
      >
        { this.renderLayoutContent() }
      </AppLayout>
    );
  }

  /**
   * Renders layout content
   */
  private renderLayoutContent = () => {
    const { classes, signedToken } = this.props;
    const { tabIndex, userItems } = this.state;

    if (!signedToken) {
      return <Typography variant="h4">{ strings.generic.noPermissions }</Typography>;
    }

    return (
      <>
        <img
          className={ classes.logo }
          alt="Company logo"
          src={ logo }
        />
        <Tabs
          classes={{ indicator: classes.indicator }}
          onChange= { this.setTabIndex }
          value={ tabIndex }
        >
          <Tab label={ strings.userPage.products } value={ 0 }/>
          <Tab label={ strings.userPage.myInfo } value={ 1 }/>
          <Tab label={ strings.userPage.categories } value={ 2 }/>
        </Tabs>
        { tabIndex === 0 &&
          <UserItemsTab
            userItems={ userItems }
          />
        }
        { tabIndex === 1 &&
          <MyInfoTab />
        }
        { tabIndex === 2 &&
          <CategoriesProvider signedToken={ signedToken } />
        }
      </>
    );
  }

  /**
   * Sets tab index
   *
   * @param event event object
   * @param newValue new tab index value
   */
  private setTabIndex = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      tabIndex: newValue
    });
  }

  /**
   * Fetches data from API
   */
  private fetchData = async () => {
    const { signedToken } = this.props;

    if (!signedToken || !signedToken.userId) {
      return;
    }

    const userId = signedToken.userId;
    const itemsApi = Api.getItemsApi(signedToken);
    const items = await itemsApi.listItems({ userId });

    this.setState({
      userItems: items
    });
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserScreen));
