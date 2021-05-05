import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  contentWrapper: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }

});