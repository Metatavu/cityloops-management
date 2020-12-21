import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    backgroundColor: theme.palette.primary.main,
    height: 200,
    width: "100%",

    [theme.breakpoints.up("lg")]: {
      height: 100
    }
  },

  privacyStatement: {
    cursor: "pointer",
  }

});