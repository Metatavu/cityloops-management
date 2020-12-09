import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, WithStyles, withStyles, CircularProgress } from "@material-ui/core";
import styles from "../../styles/components/generic/generic-confirm-dialog";
import strings from "../../localization/strings";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles>{
  open: boolean;
  fullScreen?: boolean;
  error?: boolean;
  title: string;
  loading?: boolean;
  success?: boolean;
  successTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  successCloseButtonText?: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  onSuccessClose?: () => void;
}

/**
 * Generic React component displaying confirm dialogs
 * 
 * @param props component properties
 */
const ConfirmDialog: React.FC<Props> = ({
  title,
  open,
  loading,
  confirmButtonText,
  cancelButtonText,
  successCloseButtonText,
  onClose,
  onCancel,
  onConfirm,
  onSuccessClose,
  success,
  successTitle,
  error,
  fullScreen,
  children,
  classes
}) => {

  /**
   * Renders dialog content
   */
  const renderDialogContent = () => {
    if (loading) {
      return (
        <div className={ classes.loaderWrapper }>
          <CircularProgress size={ 60 } />
        </div>
      );
    }

    return (
      <>
        <DialogTitle id="alert-dialog-title">
          { success ?
            successTitle ?? strings.generic.successfulOperation :
            title
          }
        </DialogTitle>
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          { !success &&
            <Button
              onClick={ onCancel }
              color="primary"
              className={ classes.cancelButton }
            >
              { cancelButtonText ?? strings.generic.no }
            </Button>
          }
          <Button
            disableElevation
            variant="contained"
            disabled={ error }
            onClick={ success ? onSuccessClose : onConfirm }
            color="secondary"
            autoFocus
          >
            { success ?
              successCloseButtonText ?? strings.generic.close :
              confirmButtonText ?? strings.generic.yes
            }
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen={ fullScreen }
    >
      { renderDialogContent() }
    </Dialog>
  );
}

export default withStyles(styles)(ConfirmDialog);