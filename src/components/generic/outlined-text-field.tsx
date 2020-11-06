import { TextField } from "@material-ui/core";
import withStyles, { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import * as React from "react";
import styles from "../../styles/components/generic/outlined-text-field";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  key?: string;
  label?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

/**
 * Outlined text field component
 * 
 * @param props component props
 */
const OutlinedTextField: React.FC<Props> = ({
  classes,
  key,
  label,
  value,
  className,
  style,
  onChange
}) => {
  return (
    <TextField
      key={ key }
      label={ label }
      size="medium"
      variant="outlined"
      fullWidth
      className={ classNames(classes.root, className) }
      style={ style }
      InputLabelProps={{ variant: "outlined" }}
      value={ value }
      onChange={ onChange && onChange }
    />
  );
}

export default withStyles(styles)(OutlinedTextField);