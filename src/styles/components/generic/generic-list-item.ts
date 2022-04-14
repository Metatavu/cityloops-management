import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    [theme.breakpoints.up("sm")]: {
      cursor: "pointer",
      transition: "box-shadow 0.3s ease-out",
      "&:hover": {
        boxShadow: "0 0 30px rgba(0,0,0,0.15)"
      }
    }
  },

  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  list: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    }
  },

  cardContent: {
    "& h4": {
      marginTop: theme.spacing(1)
    }
  },

  listContent: {
    display: "flex",
    width: "100%"
  },

  listItemAvatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: 50,
    height: 50,
    overflow: "hidden",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: 80,
      height: 80,
    }
  },

  imageWrapper: {
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    display: "flex",
    width: "100%",
    height: 100,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#ddd",
    [theme.breakpoints.up("sm")]: {
      height: 150,
    },
    [theme.breakpoints.up("md")]: {
      height: 180,
    },
    [theme.breakpoints.up("lg")]: {
      height: 200,
    },
  },

  cardImage: {
    maxWidth: "100%",
    margin: "0 auto"
  },

  image: {
    width: "100",
    height: 200,
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  priceContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    backgroundColor: "rgba(1, 77, 118, 0.8)"
  },

  priceText: {
    color: "#fff"
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
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    "& h3": {
      marginTop: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        marginTop: 0
      }
    }
  },

});