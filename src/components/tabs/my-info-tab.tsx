import * as React from "react";

import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/components/screens/add-item-screen";
import strings from "../../localization/strings";

/**
 * Functional component for user information editing tab
 */
const MyInfoTab: React.FC<WithStyles<typeof styles>> = () => {
  return (
    <Typography variant="h2">{ strings.userPage.myInfo } -{ strings.comingSoon }</Typography>
  );
};

export default withStyles(styles)(MyInfoTab);