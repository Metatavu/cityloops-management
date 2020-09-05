import { createMuiTheme } from '@material-ui/core';
import { red, grey } from "@material-ui/core/colors";

export default createMuiTheme({

  palette: {
    primary: { main: grey[900] },
    background: {
      default: "#f2f2f2",
      paper: "#fff"
    },
    text: {
      primary: "#000",
      secondary: "#888"
    },
    error: red,
  },
});
