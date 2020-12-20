import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loader: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50
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

  formRow: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  checkbox: { },

  dialogActions: {
    padding: 24
  },

  submitButton: {
    padding: 15,
    color: theme.palette.common.white
  },

  successfulRegistration: {
    marginTop: 20
  }

});