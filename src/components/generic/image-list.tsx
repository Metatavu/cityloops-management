import * as React from "react";
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/image-list";
import strings from "../../localization/strings";
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  images?: string[];
  onUpdate?: (images: string[]) => void;
}

/**
 * Image list component
 * 
 * TODO:
 * Add image uploading
 */
const ImageList: React.FC<Props> = props => {
  const { classes, images } = props;

  /**
   * Renders images
   */
  const renderImages = () => {
    return images ?
      images.map((image, index) =>
        <div
          key={ index }
          className={ classes.image }
          style={{ backgroundImage: `url(${image})` }}
        />
      ) :
      [];
  }

  /**
   * Renders add image
   */
  const renderAddImage = () => {
    return (
      <div className={ classes.addImage }>
        <AddAPhotoOutlinedIcon />
      </div>
    );
  }

  /**
   * Component render
   */
  return(
    <div className={ classes.root }>
      <Typography
        variant="h6"
        className={ classes.title }
      >
        { strings.items.images }
      </Typography>
      <div className={ classes.imagesContainer }>
        { renderAddImage() }
        { renderImages() }
      </div>
    </div>
  );
};

export default withStyles(styles)(ImageList);