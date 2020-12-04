import { createMuiTheme } from '@material-ui/core';
import { red, green, yellow } from "@material-ui/core/colors";

export default createMuiTheme({

  palette: {
    // Color scheme for Material UI
    primary: { main: "#004D76" },
    secondary: { main: "#00B6ED" },
    success: { main: green.A700 },
    warning: { main: yellow.A700 },
    error: { main: red.A700 },
    background: {
      default: "#FFFFFF",
      paper: "#F7F7F7"
    },
    text: {
      primary: "#222",
      secondary: "#888",
      disabled: "#aaa"
    },
  },
  typography: {
    // Typography setup for Material UI
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontSize: 32,
      fontWeight: 900
    },
    h2: {
      fontSize: 26,
      fontWeight: "bold"
    },
    h3: {
      fontSize: 22,
      fontWeight: "bold"
    },
    h4: {
      fontSize: 16,
      fontWeight: "bold"
    },
    h5: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#004D76"
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {}
  },
  overrides: {
    // Style overrides for Material UI components
    MuiButton: {
      root: {
        textTransform: "initial",
        fontWeight: 900
      },
      containedSecondary: {
        color: "#fff"
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        fontWeight: 600,
        "&.Mui-selected": {
          color: "#00B6ED"
        }
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "#fff"
      }
    }
  },
  props: {
    // Default properties for Material UI components
  }
});
