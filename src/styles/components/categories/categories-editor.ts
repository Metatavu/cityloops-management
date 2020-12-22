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

  editorContent: {
    display: "flex",
    height: 800,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },

  treeContainer: {
    display: "flex",
    flex: 1,
    borderRight: "solid 1px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none"
    }
  },

  treeWrapper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    overflowY: "auto",
    "& > div div:focus": {
      outline: "none"
    },
    "& .rstcustom__rowWrapper": {
      flex: "1 1 auto"
    },
    "& .rstcustom__row": {
      flex: "1 1 auto"
    },
    "& .rstcustom__node": {
      "& > div": {
        display: "flex"
      },
      "& .rstcustom__rowLabel": {
        paddingRight: 0,
        flex: "1 1 auto"
      }
    }
  },

  actionButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },

  propertiesContainer: {
    display: "flex",
    flex: 2,
  }

});