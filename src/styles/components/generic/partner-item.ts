import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(5),
    },
    display: "flex",
    flexDirection: "column",
    backgroundImage: "linear-gradient( rgba(255,255,255,1), rgba(255,255,255,0))",
    maxHeight: "100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  imageContainer: {
    height: 100,
    width: 300,
    display: "flex",
    justifyContent: "center",
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