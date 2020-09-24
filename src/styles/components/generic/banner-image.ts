import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    position: "relative",
    width: "100%",
    height: 250,

    [theme.breakpoints.up("md")]: {
      height: 300
    },

    [theme.breakpoints.up("lg")]: {
      height: 400
    },

    [theme.breakpoints.up("xl")]: {
      height: 500
    },
  },

  title: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    width: "100%",
    backgroundColor: "rgba(0, 182, 237, 0.8)",
    fontWeight: "bold"
  },

  chevron: {
    fontSize: 48,
    color: "#fff"
  }

});