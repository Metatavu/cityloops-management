import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0
  },

  list: {
    display: "flex",
    borderRadius: 0,
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  cardContent: {

  },

  listContent: {
    display: "flex",
  },

  listItemAvatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },

  imageWrapper: {
    width: "100%",
    height: 200,
    overflow: "hidden"
  },

  cardImage: {
    maxWidth: "100%",
    maxHeigh: "100%"
  }

});