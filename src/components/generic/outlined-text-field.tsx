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
  name?: string;
  label?: string;
  value?: string | number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  type?: string;
  disabled?: boolean;
}

/**
 * Outlined text field component
 * 
 * @param props component props
 */
const OutlinedTextField: React.FC<Props> = ({
  classes,
  key,
  name,
  label,
  value,
  className,
  style,
  type,
  disabled,
  onChange
}) => {
  return (
    <TextField
      key={ key }
      name={ name }
      label={ label }
      type={ type }
      size="medium"
      variant="outlined"
      fullWidth
      disabled={ disabled }
      className={ classNames(classes.root, className) }
      style={ style }
      InputLabelProps={{ variant: "outlined" }}
      value={ value }
      onChange={ onChange && onChange }
    />
  );
}

export default withStyles(styles)(OutlinedTextField);