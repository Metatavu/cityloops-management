import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loader: {
    alignSelf: "center"
  },

  dialogContainer: {
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    margin: 0,
    borderRadius: 0,
    [theme.breakpoints.up("md")]: {
      margin: 32,
      width: "calc(100% - 64px)",
      height: "calc(100% - 64px)"
    }
  },

  dialogTitle: { },

  dialogClose: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1)
  },

  dialogContent: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  gridRoot: {
    height: "100%"
  },

  column: {
    padding: 20
  },

  columnDivider: {
    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid rgba(0, 0, 0, .1)"
    }
  },

  dialogActions: {
    padding: 10
  },

  marginTop: {
    marginTop: theme.spacing(2)
  },

  buttonOutlined: {
    width: 150,
    padding: 10,
    "&:not(:first-child)": {
      marginLeft: 10
    }
  },

  buttonContained: {
    width: 150,
    padding: 10,
    color: theme.palette.common.white,
    "&:not(:first-child)": {
      marginLeft: 10
    }
  }

});