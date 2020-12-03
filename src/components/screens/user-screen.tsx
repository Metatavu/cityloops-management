import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReduxActions, ReduxState } from "../../store";
import { AccessToken } from "../../types";
import strings from "../../localization/strings";
import { History } from "history";
import { Tab, Tabs, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/screens/user-screen";
import AppLayout from "../layouts/app-layout";

import ProductsTab from "../tabs/products-tab";
import CategoryEditorTab from "../tabs/category-editor-tab";
import MyInfoTab from "../tabs/my-info-tab";

import logo from "../../resources/images/toimintakeskus.png";

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
      tabIndex: 0
    };
  }

  /**
   * Component render method
   */
  public render = () => {
    const { tabIndex } = this.state;
    const { classes } = this.props;

    return (
      <AppLayout
        banner={ false }
      >
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
          <ProductsTab />
        }
        { tabIndex === 1 &&
          <MyInfoTab />
        }
        { tabIndex === 2 &&
          <CategoryEditorTab />
        }
      </AppLayout>
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
