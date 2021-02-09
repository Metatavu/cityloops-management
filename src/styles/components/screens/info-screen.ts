import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loader: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },

  title: {
    color: theme.palette.text.primary
  }

});