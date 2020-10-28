import { createStyles } from "@material-ui/core";
import locationPlaceholderImage from "../../../resources/images/location-placeholder.png";

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
    backgroundImage: `url(${locationPlaceholderImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }

});