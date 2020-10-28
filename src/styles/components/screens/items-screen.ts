import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loader: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: theme.palette.text.primary
  },
});