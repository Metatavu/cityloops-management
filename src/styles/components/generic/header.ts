import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    minHeight: 59,
    [theme.breakpoints.up("md")]: {
      minHeight: 64,
    }
  },

  appBar: {
    backgroundColor: theme.palette.primary.main,

    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.background.default
    }
  },

  mobileToolbarContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },

  desktopContent: {
    display: "flex",
    alignItems: "center"
  },

  logo: {
    height: 64,
    padding: 8
  },

  accountSection: {
    height: 64,
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
  },

  menuButton: {
    padding: "8px 10px",
    marginLeft: 20,
    textTransform: "none",

    "&:first-child": {
      marginLeft: 0
    }
  },

  menuButtonOutlined: {
    padding: "8px 10px",
    marginLeft: 20,
    borderRadius: 0,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    textTransform: "none",

    "&:first-child": {
      marginLeft: 0
    }
  },

  languageSelect: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      "& .MuiSelect-icon": {
        color: "#fff"
      }
    },
    [theme.breakpoints.up("md")]: {
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(4),
    }
  },

  imageButton: {
    marginRight: theme.spacing(2)
  }

});