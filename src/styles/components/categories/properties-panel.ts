import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      borderTop: "1px solid rgba(0,0,0,0.2)"
    }
  },

  propertiesContainer: {
    borderRight: "solid 1px rgba(0, 0, 0, 0.2)",
    padding: 20,
    minHeight: "100%",
    width: "50%",
    overflowY: "auto"
  },

  nameField: {
    marginBottom: 20
  },

  propertyInfoContainer: {
    padding: 20,
    minHeight: "100%",
    width: "50%"
  }

});