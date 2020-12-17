import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    [theme.breakpoints.up("sm")]: {
      cursor: "pointer",
      transition: "box-shadow 0.2s ease-out",
      "&:hover": {
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
      }
    }
  },

  list: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2)
  },

  listContent: {
    display: "flex",
    width: "100%"
  },

  cardListVariantContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  spaceBetweenContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },

});