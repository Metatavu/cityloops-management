import * as React from "react";
import { withStyles, WithStyles, Button, CircularProgress } from "@material-ui/core";
import styles from "../../styles/dialog";
import { DropzoneDialog } from "material-ui-dropzone";
import strings from "../../localization/strings";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  uploadKey?: string;
  allowedFileTypes: string[];
  buttonText?: string;
  controlled?: boolean;
  open?: boolean;
  maxImageCount?: number;
  onClose?: () => void;

  /**
   * Event callback for upload save click
   *
   * @param files files
   * @param key upload key
   */
  onSave: (files: File[], key?: string) => void;
}

/**
 * Component states
 */
interface State {
  dialogOpen?: boolean;
  uploading: boolean;
}

/**
 * Generic file uploader UI component
 */
class FileUploader extends React.Component<Props, State> {
  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      uploading: false
    };
  }

  /**
   * Component did mount life cycle method
   */
  public componentDidMount = () => {
    const { controlled } = this.props;
    if (!controlled) {
      this.setState({ dialogOpen: false });
    }
  }

  /**
   * Component render method
   */
  public render = () => {
    const { classes, controlled, buttonText } = this.props;

    if (this.state.uploading) {
      return (
        <div className={ classes.imageUploadLoaderContainer }>
          <CircularProgress color="secondary" style={{ alignSelf: "center" }} />
        </div>
      );
    }

    return (
      <>
        { !controlled &&
          <Button disableElevation variant="contained" color="secondary" onClick={ this.onOpenClick }>
            { buttonText || strings.generic.loadNew }
          </Button>
        }

        { this.renderUploadDialog() }
      </>
    );
  }

  /**
   * Render upload dialog
   */
  private renderUploadDialog = () => {
    const {
      allowedFileTypes,
      controlled,
      open,
      maxImageCount,
      onClose
    } = this.props;
    const { dialogOpen } = this.state;

    return (
      <DropzoneDialog
        dialogTitle={ strings.items.addImages }
        previewText={ strings.items.preview }
        dropzoneText={ strings.items.dropFilesHere }
        acceptedFiles={ allowedFileTypes }
        open={ controlled ? open : dialogOpen }
        onClose={ controlled ? onClose : this.onClose }
        onSave={ this.onSave }
        cancelButtonText={ strings.generic.cancel }
        submitButtonText={ strings.generic.save }
        filesLimit={ maxImageCount || 10 }
        maxFileSize={ 200000000 }
        showPreviewsInDropzone={ false }
        showFileNamesInPreview={ false }
        useChipsForPreview={ true }
      />
    );
  }

  /**
   * Open upload image dialog
   */
  private openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  }

  /**
   * Close upload image dialog
   */
  private closeDialog = () => {
    this.setState({
      dialogOpen: false
    });
  }

  /**
   * Event handler for dialog open button click
   */
  private onOpenClick = () => {
    if (!this.props.controlled) {
      this.openDialog();
    }
  }

  /**
   * Event handler for dialog close click
   */
  private onClose = () => {
    if (!this.props.controlled) {
      this.closeDialog();
    }
  }

  /**
   * Event handler for dialog save click
   *
   * @param files list of files to upload
   */
  private onSave = async (files: File[]) => {
    const { controlled } = this.props;

    this.setState({ uploading: true });

    if (!controlled) {
      this.closeDialog();
    }

    this.props.onSave(files, this.props.uploadKey);
    this.setState({ uploading: false });
  }
}

export default withStyles(styles)(FileUploader);
