import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loaderContainer: {
    position: "relative",
    height: 300
  },

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

  title: {
    color: theme.palette.text.primary
  },

  dialogTitle: { },

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
    marginTop: theme.spacing(4),
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: theme.palette.primary.main
  },

  logo: {
    width: "60%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  formRow: {
    marginTop: theme.spacing(4),
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  checkbox: { },

  dialogActions: {
    padding: theme.spacing(4),
  },

  submitButton: {
    padding: theme.spacing(2),
    color: theme.palette.common.white
  },
});