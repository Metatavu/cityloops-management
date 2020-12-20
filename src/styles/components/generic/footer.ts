import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 200,
    width: "100%",

    [theme.breakpoints.up("lg")]: {
      minHeight: 400
    }
  }

});