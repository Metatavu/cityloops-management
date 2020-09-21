import * as React from "react";

import { withStyles, WithStyles, Typography } from "@material-ui/core";
import styles from "../../styles/components/screens/item-screen";
import { useParams } from "react-router-dom";

/**
 * Functional component for item view
 */
const ItemScreen: React.FC<WithStyles<typeof styles>> = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Typography variant="h2">{ id }</Typography>
  );
}

export default withStyles(styles)(ItemScreen);