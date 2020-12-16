import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    width: "100%",
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.breakpoints.up("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    }
  }

});