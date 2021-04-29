import { createMuiTheme } from "@material-ui/core";
import { red, green, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme();
const { breakpoints } = theme;

export default createMuiTheme({

  palette: {
    // Color scheme for Material UI
    primary: { 
      main: "#004D76",
      dark: "#222"
    },
    secondary: { main: "#00B6ED" },
    success: { main: green.A700 },
    warning: { main: yellow.A700 },
    error: { main: red.A700 },
    background: {
      default: "#FFFFFF",
      paper: "#F7F7F7",
    },
    text: {
      primary: "#222",
      secondary: "#888",
      disabled: "#aaa"
    },
  },
  typography: {
    // Typography setup for Material UI
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      color: "#004D76",
      fontSize: 16,
      fontWeight: 900,
      [breakpoints.up("sm")]: {
        fontSize: 32,
      }
    },
    h2: {
      fontSize: 14,
      fontWeight: "bold",
      [breakpoints.up("sm")]: {
        fontSize: 28,
      }
    },
    h3: {
      fontSize: 14,
      fontWeight: 300,
      [breakpoints.up("sm")]: {
        fontSize: 26,
      }
    },
    h4: {
      fontSize: 12,
      fontWeight: "bold",
      [breakpoints.up("sm")]: {
        fontSize: 16,
      }
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      color: "#004D76"
    },
    h6: {
      fontSize: 16,
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#004D76"
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#fff"
    },
    body1: {},
    body2: {
      fontSize: 14
    }
  },
  overrides: {
    // Style overrides for Material UI components
    MuiCssBaseline: {
      "@global": {
        a: {
          "& button": {
            "&:hover": {
              textDecoration: "none"
            }
          }
        }
      },
    },
    MuiButton: {
      root: {
        textTransform: "initial",
        fontWeight: 900
      },
      containedPrimary: {
        "&:hover": {
          backgroundColor: "#0069a0"
        }
      },
      containedSecondary: {
        color: "#fff"
      },
      outlinedPrimary: {
        borderWidth: 2,
        "&:hover": {
          borderWidth: 2,
        }
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        fontWeight: 600,
        "&.Mui-selected": {
          color: "#00B6ED"
        }
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "#fff"
      }
    },
    MuiCardActions: {
      root: {
        "&:empty": {
          display: "none"
        }
      }
    },
    MuiCardContent: {
      root: {
        padding: theme.spacing(1),
        [breakpoints.up("sm")]: {
          padding: theme.spacing(2)
        }
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40
      }
    },
    MuiLink: {
      root: {
        cursor: "pointer"
      }
    },
    MuiBreadcrumbs: {
      ol: {
        [breakpoints.down("sm")]: {
          marginLeft: theme.spacing(2)
        }
      }
    }
  },
  props: {
    // Default properties for Material UI components
    MuiAppBar: {
      elevation: 0
    },
    MuiButton: {
      color: "primary"
    }
  }
});
