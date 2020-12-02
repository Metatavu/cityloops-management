import * as React from "react";

import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/components/screens/add-item-screen";
import strings from "../../localization/strings";

/**
 * Functional component for users product listing tab
 */
const ProductsTab: React.FC<WithStyles<typeof styles>> = () => {
  return (
    <Typography variant="h2">{ strings.userPage.products } -{ strings.comingSoon }</Typography>
  );
};

export default withStyles(styles)(ProductsTab);