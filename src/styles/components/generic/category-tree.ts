import { createStyles } from "@material-ui/core";

export default createStyles({

  root: {
    width: "100%",
    "& :focus": {
      outline: "none"
    }
  },

  loader: { },

  list: {
    width: "100%",
    height: "100%"
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    cursor: "pointer"
  },

  listItemTitle: {
    color: "#004D76",
    fontSize: 16,
    "& $rootLevel": {
      fontWeight: "bold"
    }
  },

  listItemToggleIcon: {
    color: "rgba(0, 0, 0, .54)",
    height: 24
  },

  rootLevel: {
    backgroundColor: "rgba(0, 182, 237, .1)"
  },

  focused: {
    backgroundColor: "rgba(0, 182, 237, .2)"
  }

});