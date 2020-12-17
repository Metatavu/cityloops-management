import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa"
  },

  toolbar: {
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7",
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  },

  houndList: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },

  contentWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: theme.spacing(2),
    overflowY: "auto",
    "& > div div:focus": {
      outline: "none"
    },
    "& .rstcustom__node": {
      "& > div": {
        display: "flex"
      },
      "& .rstcustom__rowLabel": {
        paddingRight: 0
      }
    }
  },

  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

});