import * as React from "react";
import { Typography, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/image-list";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import FileUploader from "../generic/file-uploader";
import DeleteIcon from "@material-ui/icons/Close";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  title: string;
  images?: string[];
  maxImageCount?: number;
  onUpdate: (images: File[]) => void;
  onImageDeleteClick: (imageUrl: string) => void;
}

/**
 * Image list component
 */
const ImageList: React.FC<Props> = props => {
  const {
    classes,
    title,
    images,
    maxImageCount,
    onUpdate,
    onImageDeleteClick
  } = props;

  const [ uploadModalOpen, toggleSideMenu ] = React.useState(false);
  const toggle = () => toggleSideMenu(!uploadModalOpen);

  /**
   * Renders images
   */
  const renderImages = () => {
    return images ?
      images.map((image, index) =>
        <div
          key={ index }
          className={ classes.image }
          style={{ backgroundImage: `url(${ encodeURI(image) })` }}
        >
          <div className={ "image-delete-overlay" } onClick={ () => onImageDeleteClick(image) }>
            <DeleteIcon></DeleteIcon>
          </div>
        </div>
      ) :
      [];
  };

  /**
   * Event handler for image upload
   *
   * @param files list of files to upload
   * @param key file key
   */
  const onImageUpload = (files: File[], key?: string | undefined) => {
    toggle();
    onUpdate(files);
  };

  /**
   * Renders add image
   */
  const renderAddImage = () => {
    return (
      <div className={ classes.addImage }>
        <AddAPhotoOutlinedIcon
          onClick={ toggle }
        />
        <FileUploader
          maxImageCount={ maxImageCount }
          controlled={ true }
          open={ uploadModalOpen }
          allowedFileTypes={ [ "image/png", "image/jpeg" ] }
          onSave={ onImageUpload }
          onClose={ toggle }
        />
      </div>
    );
  };

  /**
   * Component render
   */
  return(
    <div className={ classes.root }>
      <Typography
        variant="h4"
        className={ classes.title }
      >
        { title }
      </Typography>
      <div className={ classes.imagesContainer}>
        { renderAddImage() }
        <div className={ classes.imagesList }>
          { renderImages() }
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ImageList);