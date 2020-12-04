import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    display: "flex",
    borderRadius: 4,
    width: 250,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 182, 237, 0.1)",
    border: "1px solid rgba(0, 182, 237, 0.2)"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingLeft: theme.spacing(1)
  }

});