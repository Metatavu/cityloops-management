import * as React from "react";

import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/components/screens/add-item-screen";
import strings from "../../localization/strings";

/**
 * Functional component for category editor tab
 */
const CategoryEditorTab: React.FC<WithStyles<typeof styles>> = () => {
  return (
  <Typography variant="h2">{ strings.userPage.categories } - { strings.comingSoon }</Typography>
  );
};

export default withStyles(styles)(CategoryEditorTab);