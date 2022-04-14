import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundPosition: "center 33%",
    backgroundSize: "cover",
    flexDirection: "column",
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6)
    },

    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(8)
    },

    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(12)
    },
  },

  partners: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: theme.spacing(2),
    alignSelf: "center",
    maxWidth: 1280,
    width: "90vw",
    [theme.breakpoints.up("md")]: {
      height: 120
    },
    [theme.breakpoints.up("lg")]: {
      height: 150
    },
    [theme.breakpoints.up("xl")]: {
      height: 175
    }
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