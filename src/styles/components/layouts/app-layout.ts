import { createStyles } from "@material-ui/core";

export default createStyles({

  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  contentWrapper: {
    flexGrow: 1,
    overflowY: "auto",
    paddingTop: 10,
    paddingBottom: 10
  }

});