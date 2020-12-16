import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  mapRoot: {
    width: "100%",
    height: 250,
    [theme.breakpoints.up("sm")]: {
      height: 300,
    },
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
    [theme.breakpoints.up("lg")]: {
      height: 500,
    },
  },

  mapContainer: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%"
  }

});