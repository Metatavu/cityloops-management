import { withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import styles from "../../styles/components/generic/items-row";

/**
 * Interface describing properties from screen component
 */
export interface ScreenProps {
}

/**
 * Interface describing other component properties
 */
export interface OtherProps extends WithStyles<typeof styles> {
}

/**
 * Intersection type for all component properties
 */
type Props = ScreenProps & OtherProps;

/**
 * Functional component for product items row
 *
 * @param props component props
 */
const ItemsRow: React.FC<Props> = props => {
  const { classes, children } = props;

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      { children }
    </div>
  );
}

export default withStyles(styles)(ItemsRow);
