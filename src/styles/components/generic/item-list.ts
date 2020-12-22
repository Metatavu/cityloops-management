import { createStyles } from '@material-ui/core';
import theme from "../../theme";

export default createStyles({

  root: {
    marginTop: theme.spacing(2)
  },
  
  toolBar: {
    justifyContent: "space-between"
  },

  listRoot: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2)
    }
  },


  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.breakpoints.up("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: theme.spacing(1)
    },
    [theme.breakpoints.up("md")]: {
      gridGap: theme.spacing(2),
      gridTemplateColumns: "repeat(4, 1fr)"
    }
  },

  list: {
    display: "flex",
    flexDirection: "column"
  },

  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }

});