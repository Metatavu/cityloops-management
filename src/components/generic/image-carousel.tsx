import { Dialog, Fade, IconButton, withStyles, WithStyles } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import * as React from "react";
import strings from "../../localization/strings";
import brokenImage from "../../resources/svg/broken-image-icon.svg";
import styles from "../../styles/components/generic/image-carousel";
import theme from "../../styles/theme";


/**
 * Interface describing component properties
 */
export interface Props extends WithStyles<typeof styles> {
  imageUrls: string[];
}

/**
 * Functional component for image carousel
 * 
 * @param props component props
 */
const ImageCarousel: React.FC<Props> = ({ classes, imageUrls }) => {

  const [ imageIndex, setImageIndex ] = React.useState<number>(0);
  const [ fullScreen, setFullScreen ] = React.useState<boolean>(false);

  /**
   * Event handler for next image click
   */
  const onNextClick = () => {
    setImageIndex(imageUrls.length - 1 > imageIndex ? imageIndex + 1 : 0);
  }

  /**
   * Event handler for previous image click
   */
  const onPreviousClick = () => {
    setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageUrls.length - 1);
  }

  /**
   * Toggles image full screen mode
   */
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  }

  /**
   * Renders navigation controls
   * 
   * @param color optional color
   */
  const renderNavigation = (color?: string) => {
    return (
      <>
        <IconButton
          className={ classes.previousButton }
          onClick={ onPreviousClick }
          style={ color ? { color } : {} }
        >
          <ChevronLeftIcon/>
        </IconButton>
        <IconButton
          className={ classes.nextButton }
          onClick={ onNextClick }
          style={ color ? { color } : {} }
        >
          <ChevronRightIcon/>
        </IconButton>
      </>
    );
  }

  /**
   * Renders images
   */
  const renderImages = () => {
    if (imageUrls.length === 0) {
      return (
        <Fade
          key="no-image-placeholder"
          in={ true }
          timeout={ 250 }
        >
          <img
            src={ brokenImage }
            alt={ strings.generic.imageAlt }
            className={ classes.image }
          />
      </Fade>
      );
    }
    return imageUrls.map((imageUrl, index) =>
      <Fade
        key={ index }
        in={ index === imageIndex }
        timeout={ 250 }
      >
        <img
          src={ imageUrl }
          alt={ strings.generic.imageAlt }
          className={ classes.image }
        />
      </Fade>
    );
  }

  /**
   * Renders full screen toggle button
   */
  const renderFullScreenToggle = () => {
    return (
      <IconButton
        className={ classes.fullScreenButton }
        onClick={ toggleFullScreen }
      >
        <ZoomOutMapIcon/>
      </IconButton>
    );
  }

  /**
   * Renders fullscreen dialog
   */
  const renderFullscreenDialog = () => {
    return (
      <Dialog
        fullScreen
        open={ fullScreen }
        onClose={ toggleFullScreen }
        PaperProps={{
          square: true,
          className: classes.fullscreenContainer
        }}
      >
        <IconButton onClick={ toggleFullScreen } className={ classes.closeFullScreenButton }>
          <CloseIcon color="inherit"/>
        </IconButton>
        { renderImages() }
        { imageUrls.length > 1 &&
          renderNavigation(theme.palette.common.white)
        }
      </Dialog>
    );
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      { renderImages() }
      <div className={ classes.controlOverlay }>
        { imageUrls.length > 1 &&
          renderNavigation()
        }
        { renderFullScreenToggle() }
      </div>
      { renderFullscreenDialog() }
    </div>
  );
}

export default withStyles(styles)(ImageCarousel);
