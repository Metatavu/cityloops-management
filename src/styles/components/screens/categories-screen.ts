import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },

  treeContainer: {
    width: "50%",
    height: 800,
    borderRight: "solid 1px rgba(0, 0, 0, .2)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none"
    }
  },

  actionButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },

  propertiesContainer: {
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "100%"
    }
  }

});