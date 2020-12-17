import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: { },

  popoverButton: {
    textTransform: "initial",
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      color: theme.palette.secondary.main
    }
  },

  popover: {
    marginTop: 15,
    borderRadius: 0
  },

  popoverContent: {
    width: 300,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  loginRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:not(:first-child)": {
      marginTop: 20
    }
  },

  loginButton: {
    borderRadius: 0,
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      color: theme.palette.secondary.main
    }
  },

  registerButton: {
    marginTop: 30,
    padding: 10,
    fontWeight: 600,
    textTransform: "initial",
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      color: theme.palette.secondary.main
    }
  },

  forgotPasswordButton: {
    marginTop: 10,
    padding: 10,
    fontWeight: 600,
    textTransform: "initial",
    color: theme.palette.secondary.main
  }

});