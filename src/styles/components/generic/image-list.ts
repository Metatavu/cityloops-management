import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: { },

  title: { },

  imagesContainer: {
    display: "flex",
    overflowX: "auto"
  },

  image: {
    minWidth: 100,
    maxWidth: 100,
    borderRadius: 5,
    margin: 10,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },

  addImage: {
    height: 100,
    minWidth: 100,
    maxWidth: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    "& svg": {
      fontSize: 60,
      color: "#fff"
    }
  }
});