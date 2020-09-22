import * as React from "react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReduxState, ReduxActions, rootReducer } from "../store";
import * as immer from "immer";

import { ThemeProvider } from "@material-ui/styles";
import cityLoopsTheme from "../styles/theme";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import strings from "../localization/strings";
import AccessTokenRefresh from "./containers/access-token-refresh";
import StoreInitializer from "./containers/store-initializer";
import moment from "moment";
import "moment/locale/fi";
import "moment/locale/en-gb";

import ItemsScreen from "./screens/items-screen";
import ItemScreen from "./screens/item-screen";
import AddItemScreen from "./screens/add-item-screen";
import CategoriesProvider from "./screens/categories-provider";
import UsersScreen from "./screens/user-screen";

const store = createStore<ReduxState, ReduxActions, any, any>(rootReducer);

/**
 * Interface representing component properties
 */
interface Props {
}

/**
 * Interface representing component state
 */
interface State {
}

/**
 * Material UI's automated responsive font sizes
 */
const theme = responsiveFontSizes(cityLoopsTheme);

/**
 * App component
 */
class App extends React.Component<Props, State> {

  /**
   * Component did mount life cycle component
   */
  public componentDidMount = () => {
    moment.locale(strings.getLanguage());
    immer.enableAllPlugins();
  }

  /**
   * Component render method
   */
  public render = () => {

    return (
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Provider store={ store }>
          <AccessTokenRefresh>
            <StoreInitializer>
              <BrowserRouter>
                <div className="App">
                  <Switch>
                    <Redirect exact from="/" to="/items" />
                    <Route
                      path="/items"
                      exact={ true }
                      render={({ history }) => (
                        <ItemsScreen
                          history={ history }
                        />
                      )}
                    />
                    <Route
                      path="/item/:id"
                      exact={ true }
                    >
                      <ItemScreen/>
                    </Route>
                    <Route
                      path="/add"
                      exact={ true }
                    >
                      <AddItemScreen/>
                    </Route>
                    <Route
                      path="/categories"
                      exact={ true }
                    >
                      <CategoriesProvider/>
                    </Route>
                    <Route
                      path="/user"
                      exact={ true }
                    >
                      <UsersScreen/>
                    </Route>
                  </Switch>
                </div>
              </BrowserRouter>
            </StoreInitializer>
          </AccessTokenRefresh>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
