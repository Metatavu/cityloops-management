import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    textDecoration: "none",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: theme.spacing(2),
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(5)
    },
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.6)",
    [theme.breakpoints.up("lg")]: {
      background: "rgba(255,255,255,0.4)"
    },
    maxHeight: "100%",
    transition: "background 0.3s ease-out",
    backdropFilter: "blur(4px)",
    "&:hover": {
      background: "rgba(255,255,255,0.7)",
      textDecoration: "underline"
    }
  },

  imageContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain"
    }
  },

  buttonContainer: {
    display: "flex",
    height: 40,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: "center"
  }

});