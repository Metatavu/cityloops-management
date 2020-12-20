import * as React from "react";
import { TextField, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/location-section";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  inputName: string;
  displayName: string;
  value: string;
  onUpdate: (value: string) => void;
}

/**
 * Interface representing component state
 */
interface State {
  searchValue: string;
}

/**
 * Component for text field with delay
 */
class TextFieldWithDelay extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: this.props.value || ""
    };
  }

  /**
   * Debounce delay for search field
   */
  private delay: NodeJS.Timeout | null = null;

  /**
   * Component render method
   */
  public render = () => {
    const {
      classes,
      inputName,
      displayName,
    } = this.props;

    return (
      <TextField
        key={ inputName }
        label={ displayName }
        value={ this.state.searchValue }
        name={ inputName }
        onChange={ this.onChange }
        fullWidth
        variant="outlined"
        InputLabelProps={{ variant: "outlined" }}
        className={ classes.textField }
      />
    );
  }

  /**
   * Event handler for text field value change
   *
   * @param event react change event
   */
  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!this.delay) {
      this.delay = setTimeout(() => {
        this.updateValue(value);
      }, 500);
    } else {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        this.updateValue(value);
      }, 500);
    }

    this.setState({ searchValue: value });
    return;
  };

  /**
   * Update value with delay
   *
   * @param value value to update
   */
  private updateValue = (value: string) => {
    const { onUpdate } = this.props;

    if (onUpdate) {
      onUpdate(value);
    }
  }
}

export default withStyles(styles)(TextFieldWithDelay);
