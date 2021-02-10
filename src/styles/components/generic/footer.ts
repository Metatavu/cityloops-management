import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.dark,
    width: "100%",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down(1360)]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },

  logo: {
    width: "100%",
    [theme.breakpoints.up(360)]: {
      width: 120
    }
  },

  footerText: {
    color: "#fff"
  },

  disclaimer: {
    display: "inline"
  },

  euSection: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "flex-start"
    }
  },

  euContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      flexDirection: "row",
    }
  },

  euPart1: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      marginLeft: theme.spacing(2)
    }
  },

  euPart2: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      marginLeft: theme.spacing(2)
    }
  },

  cityLoopsSection: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up(360)]: {
      flexDirection: "row"
    }
  },

  links: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    [theme.breakpoints.up(360)]: {
      marginTop: 0,
      marginLeft: theme.spacing(4)
    }
  },

  link: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.common.white,
    cursor: "pointer",
    marginTop: theme.spacing(2),
    "&:first-child": {
      marginTop: 0
    },
    "&:hover": {
      textDecoration: "underline"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(1),
      "&:first-child": {
        marginTop: theme.spacing(1),
      },
    }
  },

  copyright: {
    fontSize: "12px",
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    textAlign: "center"
  },

});