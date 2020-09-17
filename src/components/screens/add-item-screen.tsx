import * as React from "react";

import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/components/screens/add-item-screen";
import strings from "../../localization/strings";

/**
 * Functional component for add item view
 */
const AddItemScreen: React.FC<WithStyles<typeof styles>> = () => {
  return (
    <Typography variant="h2">{ strings.comingSoon }</Typography>
  );
}

export default withStyles(styles)(AddItemScreen);