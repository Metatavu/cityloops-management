import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },

  searchField: {
    flexGrow: 1,
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 200
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
      marginLeft: 10,
      marginBottom: 10
    }
  },

  selectField: {
    flexGrow: 1,
    marginRight: 10,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
      marginLeft: 10,
      marginBottom: 10
    }
  },

  submitButton: {
    color: theme.palette.common.white,
    paddingLeft: 30,
    paddingRight: 30,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
      marginLeft: 10,
      marginRight: 10,
      padding: 10
    }
  }

});
