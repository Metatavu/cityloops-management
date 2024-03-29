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

  bottomContent: {
    display: "flex",
    flexDirection: "column",
  },

  actionButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    "& button": {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      "& button": {
        marginRight: theme.spacing(2),
        marginTop: 0
      },
    },
  },

  deleteButton: {
    [theme.breakpoints.up("md")]: {
      minWidth: 150,
      minHeight: 50
    }
  },

  editButton: {
    [theme.breakpoints.up("md")]: {
      minWidth: 150,
      minHeight: 50,
      marginLeft: theme.spacing(2)
    }
  },

  renewButton: {
    [theme.breakpoints.up("md")]: {
      minWidth: 150,
      minHeight: 50,
      marginLeft: theme.spacing(2)
    }
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
    marginTop: theme.spacing(4),
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: theme.palette.primary.main
  },

  logo: {
    width: "60%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },

  formRow: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  checkbox: { },

  dialogActions: {
    padding: theme.spacing(3)
  },

  submitButton: {
    padding: theme.spacing(2),
    color: theme.palette.common.white
  },

  successfulRegistration: {
    marginTop: theme.spacing(3)
  },

  propertiesSection: {
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4)
    },
    [theme.breakpoints.up("lg")]: {
      padding: "50px 50px 50px 100px",
    }
  },

  itemTitle: {
    fontWeight: 900,
    fontSize: 20,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      fontSize: 28,
    },

    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(2)
    },

    [theme.breakpoints.up("lg")]: {
      fontSize: 40,
      marginBottom: theme.spacing(6)
    }
  },

  itemPrice: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      fontSize: 28,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 40,
      marginBottom: theme.spacing(2)
    }
  },

  columns: { },

  imageColumn: { },

  propertiesContainer: {
    height: "100%",
    width: "100%",
    paddingLeft: theme.spacing(5),
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
    marginTop: theme.spacing(4),
    color: theme.palette.grey[700]
  },

  locationSection: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2)
    }
  },

  locationContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },

  locationIcon: {
    color: theme.palette.grey[600],
    marginRight: theme.spacing(2),
    fontSize: 30
  },

  map: {
    width: "100%"
  },

  userInfoContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },

  image: {
    maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    }
  },

});
