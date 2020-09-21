import { createStyles } from "@material-ui/core";

export default createStyles({

  root: {
    position: "relative",
    width: "100%"
  },

  image: {
    width: "100%"
  },

  title: {
    position: "absolute",
    bottom: 5,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    width: "100%",
    backgroundColor: "rgba(0, 182, 237, 0.8)",
    fontWeight: "bold"
  },

  chevron: {
    fontSize: 48,
    color: "#fff"
  }

});