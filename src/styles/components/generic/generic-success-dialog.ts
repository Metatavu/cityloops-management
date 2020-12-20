import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loaderWrapper: {
    width: "100%",
    height: "100%",
    minWidth: 250,
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  dialogTitle: {
    
  },

  cancelButton: {
  },

  dialogClose: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1)
  },

  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  contentTitle: {
    marginTop: 25,
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: theme.palette.primary.main
  },

  logo: {
    width: "60%",
    marginTop: 25,
    marginBottom: 25
  },

});