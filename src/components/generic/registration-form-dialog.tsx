import * as React from "react";

import { Dispatch } from "redux";
import { ReduxState, ReduxActions } from "../../store";
import { connect } from "react-redux";

import { AccessToken, TextFieldTypes } from "../../types";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/registration-form-dialog";
import strings from "../../localization/strings";
import CloseIcon from '@material-ui/icons/Close';
import Api from "../../api/api";
import { User } from "../../generated/client";
import logo from "../../resources/svg/logo-primary.svg";
import privacyPolicyPDF from "../../resources/tietosuojaseloste.pdf";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  anonymousToken?: AccessToken;
  open?: boolean;
  onClose?: () => void;
}

/**
 * Interface describing component state
 */
interface State {
  loading: boolean;
  error?: FormError;
  user: User;
  success: boolean;
  termsConfirmed: boolean;
}

/**
 * Interface describing form error
 */
interface FormError {
  field: string;
  reason: string;
}

/**
 * Registration form dialog component
 */
class RegistrationFormDialog extends React.Component<Props, State> {

  /**
   * Component constructor
   *
   * @param props component props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        name: "",
        companyAccount: false,
        verified: false,
        address: "",
        email: "",
        phoneNumber: ""
      },
      success: false,
      termsConfirmed: false
    };
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes, open } = this.props;
    const { loading, error, success, termsConfirmed } = this.state;

    const canProceed = this.formFilled() && !error && termsConfirmed;

    return (
      <Dialog
        maxWidth="xs"
        fullWidth
        open={ open || false }
        onClose={ this.closeDialog }
      >
        <DialogTitle className={ classes.dialogTitle }>
          <IconButton
            className={ classes.dialogClose }
            onClick={ this.closeDialog }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={ classes.dialogContent }>
          { loading ?
            <CircularProgress size={ 60 } className={ classes.loader } /> :
            this.renderDialogContent()
          }
        </DialogContent>
        <DialogActions className={ classes.dialogActions }>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            fullWidth
            disabled={ success ? false : (loading || !canProceed) }
            className={ classes.submitButton }
            onClick={ success ? this.closeDialog : this.submitForm }
          >
            { success ?
              strings.generic.proceed :
              strings.generic.save
            }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * Renders dialog content
   */
  private renderDialogContent = () => {
    const { classes } = this.props;
    const { user, success } = this.state;

    return (
      <>
        <img
          src={ logo }
          alt={ "logo" }
          className={ classes.logo }
        />
        <Typography className={ classes.contentTitle }>
          { strings.user.registration }
        </Typography>
        { success ? (
            <Typography variant="h6" className={ classes.successfulRegistration }>
              { strings.user.registrationSuccessful }
            </Typography>
          ) : (
            <>
              { this.renderTextField("name", strings.user.name, TextFieldTypes.STRING, user.name) }
              { this.renderTextField("email", strings.user.email, TextFieldTypes.STRING, user.email) }
              { this.renderTextField("address", strings.user.address, TextFieldTypes.STRING, user.address) }
              { this.renderTextField("phoneNumber", strings.user.phoneNumber, TextFieldTypes.STRING, user.phoneNumber) }
              { this.renderCheckBox("companyAccount", strings.user.isCompanyAccount, user.companyAccount) }
              { user.companyAccount &&
                this.renderTextField("companyId", strings.user.businessId, TextFieldTypes.STRING, user.companyId)
              }
              { this.renderTextField("password", strings.user.password, TextFieldTypes.PASSWORD, user.password) }
              { this.renderConfirmPrivacy() }
            </>
          )
        }
      </>
    );
  }

  /**
   * Renders text field
   *
   * @param key key
   * @param displayName displayed name
   * @param type text field type
   * @param value value
   */
  private renderTextField = (key: string, displayName: string, type: TextFieldTypes, value?: string) => {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <div className={ classes.formRow }>
        <TextField
          key={ key }
          label={ displayName }
          size="medium"
          variant="outlined"
          fullWidth
          InputLabelProps={{ variant: "outlined" }}
          value={ value }
          onChange={ this.updateValue(key, type) }
          error={ key === error?.field }
          helperText={
            key === error?.field ?
            error?.reason :
            ""
          }
          type={ type }
        />
      </div>
    );
  }

  /**
   * Renders checkbox
   *
   * @param key key
   * @param displayName displayed name
   * @param checked checkbox is checked
   */
  private renderCheckBox = (key: string, displayName: string, checked: boolean) => {
    const { classes } = this.props;
    return (
      <div className={ classes.formRow }>
        <Checkbox
          checked={ checked }
          onChange={ this.updateValue(key, TextFieldTypes.BOOLEAN) }
          className={ classes.checkbox }
        />
        <Typography variant="body1">
          { displayName }
        </Typography>
      </div>
    );
  }

  /**
   * Renders confirm privacy checkbox
   */
  private renderConfirmPrivacy = () => {
    const { classes } = this.props;
    const { termsConfirmed } = this.state;

    return (
      <div className={ classes.formRow }>
        <Checkbox
          checked={ termsConfirmed }
          onChange={ () => this.setState({ termsConfirmed: !termsConfirmed }) }
          className={ classes.checkbox }
        />
        <Typography
          variant="body1"
          onClick={ () => window.open(privacyPolicyPDF, "_blank") }
          className={ classes.link }
        >
          { `${strings.user.confirmTerms} ${strings.user.privacyPolicies}` }
        </Typography>
      </div>
    );
  }

  /**
   * Updates user property value
   *
   * @param key property key
   * @param type property type
   * @param event React change event
   */
  private updateValue = (key: string, type?: TextFieldTypes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const updatedValue = type && type === TextFieldTypes.BOOLEAN ? checked : value;
    this.setState({
      user: { ...this.state.user, [key]: updatedValue }
    });

    if (key === "email") {
      if (!this.validEmail(value)) {
        this.setState({
          error: {
            field: "email",
            reason: strings.error.invalidEmail
          }
        });
      } else {
        this.setState({ error: undefined });
      }
    }
  }

  /**
   * Validates that form has all fields filled
   *
   * @return true if form is filled, otherwise false
   */
  private formFilled = (): boolean => {
    const { name, email, address, phoneNumber } = this.state.user;

    return (
      name !== "" &&
      email !== "" &&
      address !== "" &&
      phoneNumber !== ""
    );
  }

  /**
   * Check if email is valid
   *
   * @param email email
   * @returns true if email is valid, otherwise false
   */
  private validEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  /**
   * Submits form
   */
  private submitForm = async () => {
    const { anonymousToken } = this.props;
    const { user } = this.state;

    if (!anonymousToken) {
      return;
    }

    this.setState({ loading: true });

    try {
      const usersApi = Api.getUsersApi(anonymousToken);
      await usersApi.createUser({ user });
      this.setState({ success: true });
    } catch(e) {
      console.error(e);
    }

    this.setState({ loading: false });
  }

  /**
   * Closes dialog
   */
  private closeDialog = () => {
    const { onClose } = this.props;
    onClose && onClose();
  }
}

/**
 * Redux mapper for mapping store state to component props
 *
 * @param state store state
 */
const mapStateToProps = (state: ReduxState) => ({
  anonymousToken: state.auth.anonymousToken
});

/**
 * Redux mapper for mapping component dispatches
 *
 * @param dispatch dispatch method
 */
const mapDispatchToProps = (dispatch: Dispatch<ReduxActions>) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegistrationFormDialog));
