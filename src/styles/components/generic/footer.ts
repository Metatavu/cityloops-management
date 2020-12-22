import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    width: "100%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },

  logo: {
    width: 200,
  },

  privacyStatement: {
    color: theme.palette.common.white,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },

  copyright: {
    fontSize: "12px",
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    textAlign: "center"
  }

});