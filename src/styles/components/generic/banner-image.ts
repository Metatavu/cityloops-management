import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundPosition: "center 33%",
    backgroundSize: "cover",
    height: 0,
    [theme.breakpoints.up("sm")]: {
      height: 200
    },
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

  partners: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: theme.spacing(2),
    alignSelf: "center",
    maxWidth: 1280,
    width: "90vw",
    height: 186,
    [theme.breakpoints.up("md")]: {
      height: 200
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