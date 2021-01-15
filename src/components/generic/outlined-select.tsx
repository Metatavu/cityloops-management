import { FormControl, InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select/Select";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import * as React from "react";
import styles from "../../styles/components/generic/outlined-select";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  key: string;
  name: string;
  label: string;
  value: string | boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => void;
}

/**
 * Outlined select component
 * 
 * @param props component props
 */
const OutlinedSelect: React.FC<Props> = ({
  classes,
  key,
  name,
  label,
  value,
  className,
  children,
  onChange
}) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id={`${ label }-input-label`}>
        { label }
      </InputLabel>
      <Select
        fullWidth
        variant="outlined"
        key={ key }
        name={ name }
        className={ classNames(classes.deliverySelect, className) }
        label={ label }
        labelId={`${ label }-input-label`}
        value={ value }
        onChange={ onChange }
      >
        { children }
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(OutlinedSelect);