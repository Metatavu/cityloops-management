import { createMuiTheme } from '@material-ui/core';
import { red, green, yellow } from "@material-ui/core/colors";

export default createMuiTheme({

  palette: {
    primary: { main: "#004D76" },
    secondary: { main: "#00B6ED" },
    success: { main: green.A700 },
    warning: { main: yellow.A700 },
    error: { main: red.A700 },
    background: {
      default: "#F7F7F7",
      paper: "#fff"
    },
    text: {
      primary: "#222",
      secondary: "#888",
      disabled: "#aaa"
    },
  },
  typography: {
    fontFamily: "Kumbh Sans, sans-serif"
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "initial",
        fontWeight: 900
      },
      containedSecondary: {
        color: "#fff"
      }
    }
  }
});
