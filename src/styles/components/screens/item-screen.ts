import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  loaderContainer: {
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  propertiesSection: {
    width: "100%",
    marginTop: 50,
    padding: "50px 50px 50px 100px",
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.down("sm")]: {
      padding: 25
    }
  },

  itemTitle: {
    fontWeight: 900,
    fontSize: 40,
    marginBottom: 20
  },

  columns: { },

  imageColumn: { },

  propertiesContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: 40,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },

  propertyTitle: {
    textTransform: "capitalize",
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 18
  },

  propertyValue: { },

  createdAt: {
    marginTop: 25
  },

  locationSection: { },

  locationContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25
  },

  locationIcon: {
    color: theme.palette.grey[600],
    marginRight: 20,
    fontSize: 30
  },

  map: {
    width: "100%"
  }

});
