import { createStyles } from "@material-ui/core";
import theme from "../../theme";

export default createStyles({

  list: { },

  listItem: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[400]}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    },
    "&.Mui-selected": {
      backgroundColor: `${theme.palette.secondary.main}33`
    }
  },

  addIcon: {
    color: theme.palette.secondary.main,
    cursor: "pointer"
  },

  deleteIcon: { }

});