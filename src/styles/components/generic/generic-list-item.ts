import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    backgroundColor: "#fff"
  },

  list: {
    display: "flex",
    borderRadius: 0,
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2)
  },

  cardContent: {
    "& h4": {
      marginTop: theme.spacing(1)
    }
  },

  listContent: {
    display: "flex",
  },

  listItemAvatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: 260,
    height: 260,
    overflow: "hidden",
    alignItems: "center"
  },

  imageWrapper: {
    display: "flex",
    width: "100%",
    height: 200,
    overflow: "hidden",
    alignItems: "center"
  },

  cardImage: {
    maxWidth: "100%",
  },

  image: {
    width: "100",
    height: 200,
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }

});