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

  titleContainer: {
    display: "flex",
    justifyContent: "space-between"
  },

  actionButtonsContainer: {
  },

  deleteButton: {
    minWidth: 150,
    minHeight: 50,
    fontSize: 18
  },

  editButton: {
    minWidth: 150,
    minHeight: 50,
    marginLeft: 20,
    fontSize: 18
  },

  dialogTitle: { },

  dialogClose: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1)
  },

  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  contentTitle: {
    marginTop: 25,
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: theme.palette.primary.main
  },

  logo: {
    width: "60%",
    marginTop: 25,
    marginBottom: 25
  },

  formRow: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  checkbox: { },

  dialogActions: {
    padding: 24
  },

  submitButton: {
    padding: 15,
    color: theme.palette.common.white
  },

  successfulRegistration: {
    marginTop: 20
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

  itemPrice: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 100
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
