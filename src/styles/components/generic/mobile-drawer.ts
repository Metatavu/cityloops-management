import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export const styles = createStyles({

  drawerContent: {
    height: "100%",
    minWidth: 260,
    [theme.breakpoints.up("sm")]: {
      minWidth: 300
    }
  },

  logo: {
    height: 35
  },

  title: {
    height: 50,
    padding: 10,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold"
  },

  menu: {
    height: "calc(100% - 300px)",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "2px solid rgba(0, 0, 0, .1)"
  },

  listIcon: {
  }

});