import * as React from "react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReduxState, ReduxActions, rootReducer } from "../store";
import * as immer from "immer";

import { ThemeProvider } from "@material-ui/styles";
import cityLoopsTheme from "../styles/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import strings from "../localization/strings";
// import AccessTokenRefresh from "./containers/access-token-refresh";
import StoreInitializer from "./containers/store-initializer";
import moment from "moment";
import "moment/locale/fi";
import "moment/locale/en-gb";

import MainScreen from "./screens/main-screen";

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
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {/* TODO: Uncomment this when we have keycloak instance running */}
          {/* <AccessTokenRefresh> */}
            <StoreInitializer>
              <BrowserRouter>
                <div className="App">
                  <Switch>
                    <Route
                      path="/"
                      exact={ true }
                      render={({ history }) => (
                        <MainScreen
                          history={ history }
                        />
                      )}
                    />
                  </Switch>
                </div>
              </BrowserRouter>
            </StoreInitializer>
          {/* </AccessTokenRefresh> */}
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;