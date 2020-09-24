import { createStyles } from "@material-ui/core";
import theme from "../../theme";
import drawerBackground from "../../../resources/svg/mobile-drawer-background.svg";

export const styles = createStyles({

  drawerContent: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    minWidth: 300
  },

  logoArea: {
    height: 250,
    backgroundImage: `url(${drawerBackground})`,
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    width: "100%"
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