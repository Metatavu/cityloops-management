import { createStyles } from "@material-ui/core";

export default createStyles({

  root: { },

  textField: {
    "&:not(:first-child)": {
      marginTop: 10
    }
  },

  locationPlaceholder: {
    width: "100%",
    height: 300,
  }

});