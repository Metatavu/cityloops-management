import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    position: "relative",
    width: "100%",
    height: 200,
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.up("sm")]: {
      height: 300,
    },
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
    [theme.breakpoints.up("lg")]: {
      height: 500,
    },
  },

  controlOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  previousButton: {
    position: "absolute",
    left: theme.spacing(1),
    bottom: 0,
    transition: "color 0.2s ease-out",
    [theme.breakpoints.up("lg")]: {
      bottom: "50%",
      transform: "translateY(50%)"
    },
    "& svg": {
      fontSize: 24,
      [theme.breakpoints.up("lg")]: {
        fontSize: 50,
      }
    },
    "&:hover": {
      color: "#fff"
    }
  },

  nextButton: {
    position: "absolute",
    right: theme.spacing(1),
    bottom: 0,
    transition: "color 0.2s ease-out",
    [theme.breakpoints.up("lg")]: {
      bottom: "50%",
      transform: "translateY(50%)"
    },
    "& svg": {
      fontSize: 24,
      [theme.breakpoints.up("lg")]: {
        fontSize: 50,
      }
    },
    "&:hover": {
      color: "#fff"
    }
  },

  fullScreenButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },

  fullscreenContainer: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, .2)"
  },

  closeFullScreenButton: {
    backgroundColor: theme.palette.common.black,
    zIndex: 2000,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.common.white
  },

  closeIcon: {
    fontSize: 40
  }

});