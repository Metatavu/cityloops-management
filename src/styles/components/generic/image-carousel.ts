import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    position: "relative",
    width: "100%",
    height: 500,
    backgroundColor: theme.palette.grey[300]
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
    top: "45%",
    left: 10,
    "& svg": {
      fontSize: 50
    }
  },

  nextButton: {
    position: "absolute",
    top: "45%",
    right: 10,
    "& svg": {
      fontSize: 50
    }
  },

  fullScreenButton: {
    position: "absolute",
    top: 10,
    right: 10
  },

  fullscreenContainer: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, .2)"
  },

  closeFullScreenButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: theme.palette.common.white
  },

  closeIcon: {
    fontSize: 40
  }

});