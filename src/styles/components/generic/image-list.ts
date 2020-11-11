import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: { },

  title: { },

  loader: {
    alignSelf: "center"
  },

  imagesContainer: {
    display: "flex",
  },

  addImage: {
    flex: 1,
    height: 100,
    width: 100,
    minWidth: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: "10px 10px 10px 0",
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    "& svg": {
      fontSize: 60,
      color: "#fff"
    }
  },

  imagesList: {
    display: "flex",
    flex: 3,
    overflowX: "auto"
  },

  image: {
    position: "relative",
    cursor: "pointer",
    width: 100,
    minWidth: 100,
    height: 100,
    borderRadius: 5,
    margin: 10,
    backgroundPosition: "center",
    backgroundSize: "cover",
    "& .image-delete-overlay": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      position: "absolute",
      top: 0,
      bottom: 0,
      opacity: 0,
      width: "100%",
      borderRadius: 5,
      backgroundColor: "rgba(0,0,0,0.5)",
      transition: "opacity 0.2s ease-out"
    },
    "&:hover": {
      "& .image-delete-overlay": {
        opacity: 1
      },
    }
  },
});