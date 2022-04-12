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
    boxShadow: "0 0 30px rgba(0,0,0,0.2)",
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

  toolbar: {
    justifyContent: "space-between"
  },

  logo: {
    height: 64,
    padding: theme.spacing(1),
    cursor: "pointer"
  },

  mobileLogo: {
    height: 32
  },

  accountSection: {
    height: 64,
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },

  menuButton: {
    padding: "8px 10px",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2)
    },
    "&:first-child": {
      marginLeft: 0
    }
  },

  menuButtonOutlined: {
    padding: "8px 10px",
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

    [theme.breakpoints.down("sm")]: {
      "& .MuiSelect-icon": {
        color: "#fff"
      }
    },
    [theme.breakpoints.up("md")]: {
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(4),
    },
    "&:before": {
      display: "none"
    },
    "& .MuiSelect-select": {
      textTransform: "uppercase"
    }
  },

  imageButton: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(2)
    }
  },

  link: {
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    "&:hover": {
      textDecoration: "underline"
    }
  }

});