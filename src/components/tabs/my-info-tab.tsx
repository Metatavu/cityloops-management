import * as React from "react";
import styles from "../../styles/components/tabs/my-info-tab";
import strings from "../../localization/strings";
import { TextField, Typography, WithStyles, withStyles, Grid, GridDirection, GridProps, GridSize, Button, Box } from "@material-ui/core";
import Map from "../generic/map";
import { User } from "../../generated/client";
import TextFieldWithDelay from "../generic/text-field-with-delay";
import MapFunctions from "../../utils/map-functions";
import { History } from "history";
import ImageList from "../generic/image-list";
import { getPresignedPostData, uploadFileToS3 } from "../../utils/image-upload";
import { SignedToken } from "../../types";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  signedToken: SignedToken;
  user?: User;
  onUserInfoChange: (user: User) => void;
  onUserSave: () => void;
  history: History;
}

/**
 * Functional component for user information editing tab
 */
const MyInfoTab: React.FC<Props> = props => {
  const {
    classes,
    signedToken,
    user,
    onUserInfoChange,
    onUserSave,
  } = props;

  const [ numberError, setNumberError ] = React.useState(false);
  const [ emailError, setEmailError ] = React.useState(false);

  /**
   * Renders my information content
   */
  const renderMyInformationContent = () => {

    return (
      <Grid
        container
        spacing={ 0 }
        className={ classes.gridRoot }
      >
        <Grid
          { ...getGridContainerProps( ) }
        >
          <Grid
            { ...getGridItemProps(12, 6) }
            className={ classes.column }
          >
            { renderTextField("name", strings.generic.name, user?.name || "") }
            { user?.companyAccount && renderTextField("companyId", strings.user.businessId, user?.companyId || "") }
            { renderTitle(strings.user.contactInformation) }
            { renderTextField("phoneNumber", strings.user.phoneNumber, user?.phoneNumber || "") }
            { renderTextField("email", strings.user.email, user?.email || "") }
            { renderTextField("address", strings.user.address, user?.address || "") }
            { renderTextField("description", strings.user.description, user?.description || "", 10) }
            <Box mt={ 2 }>
              <ImageList
                maxImageCount={ 1 }
                title={ strings.user.logo }
                onImageDeleteClick={ () => onLogoUpdate() }
                onUpdate={ onLogoUpdate }
                images={[ user?.logoUrl || "" ]}
              />
            </Box>
            { renderActionButtons() }
          </Grid>
          <Grid
            { ...getGridItemProps(12, 6) }
            className={ classes.column }
          >
            { user?.companyAccount && renderTextField("officeInfo", strings.user.officeInfo, user.officeInfo || "" ) }
            {
              user?.companyAccount &&
              <TextFieldWithDelay
                displayName={ strings.user.address }
                inputName="address"
                onUpdate={ handleAddressChange }
                value={ user?.address || "" }
              />
            }
            { user?.companyAccount && renderMap() }
          </Grid>
        </Grid>
      </Grid>
    );
  };

  /**
   * Update user logo
   *
   * @param files image files
   */
  const onLogoUpdate = async (files?: File[]) => {

    if (!files || files.length < 1) {
      onUserInfoChange({ ...user, logoUrl: undefined } as User);
      return;
    }

    const newLogo = await uploadImages(files);
    onUserInfoChange({ ...user, logoUrl: newLogo[0] } as User);

  };

  /**
   * Uploads images to AWS S3
   *
   * @param files list of files to upload
   */
  const uploadImages = async (files: File[]): Promise<string[]> => {

    if (!signedToken) {
      return [];
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      try {
        const res = await getPresignedPostData(file, signedToken.userId!);
        await uploadFileToS3(res.data, file);
        const imageUrl = `${res.basePath}/${res.data.fields.key}`;
        imageUrls.push(imageUrl);
      } catch (e) {
        Promise.reject();
      }
    }

    return imageUrls;
  }

  /**
   * Renders text field title
   *
   * @param title title
   */
  const renderTitle = (title: string) => {
    return (
      <Typography
        variant="h4"
        className={ classes.title }
      >
        { title }
      </Typography>
    );
  };

  /**
   * Renders text field
   *
   * @param key text field key
   * @param displayName text field display name
   * @param value text field value
   * @param rows number of rows
   */
  const renderTextField = (key: string, displayName: string, value: string, rows?: number) => {
    let [ error, text ] = [ false, "" ];
    if (key === "phoneNumber") {
      error = numberError;
      text = error ? strings.error.invalidNumber : "";
    }
    if (key === "email") {
      error = emailError;
      text = error ? strings.error.invalidEmail : "";
    }

    return (
      <TextField
        className={ classes.inputField }
        key={ key }
        name={ key }
        label={ displayName }
        value={ value }
        onChange={ handleInfoUpdate }
        variant="outlined"
        size="medium"
        fullWidth
        multiline={ !!rows }
        rows={ rows }
        rowsMax={ 10 }
        error={ error }
        helperText={ text }
      />
    );
  };

  /**
   * Renders map
   */
  const renderMap = () => {
    return (
      <div className={ classes.mapContainer }>
        <Map
          address={ user?.address }
          coordinates={ user?.coordinates }
        />
      </div>
    );
  };

  /**
   * Renders action buttons
   */
  const renderActionButtons = () => {
    return (
      <div className={ classes.actionButtonsContainer }>
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: 20 }}
          onClick={ onChangePassWordClick }
        >
          { strings.user.changePassword }
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={ onUserSave }
        >
          { strings.generic.save }
        </Button>
      </div>
    );
  };

  /**
   * Event handler for info update
   *
   * @param event react change event
   */
  const handleInfoUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!name || !user) {
      return;
    }

    if (name === "email") {
      let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
      if (valid) {
        setEmailError(false);
        onUserInfoChange({ ...user, [name]: value });
      } else {
        setEmailError(true);
      }
    }

    if (name === "phoneNumber") {
      let valid = true;
      for (let i=0; i<value.length; i++) {
        if (i===0) {
          if (!/[0-9+]/.test(value[i])) {
            valid = false;
          }
        }
        else if (!/[0-9]/.test(value[i])) {
          valid = false;
        }
      }
      if (valid) {
        setNumberError(false);
        onUserInfoChange({ ...user, [name]: value });
      } else {
        setNumberError(true);
      }
    } else {
      onUserInfoChange({ ...user, [name]: value });
    }
  };

  /**
   * Event handler for address change
   *
   * @param value new address
   */
  const handleAddressChange = async (value: string) => {
    onUserInfoChange(await updateLocation(value));
  };

  /**
   * Update location (coordinates) based on address search result
   *
   * @param address address to search
   * @returns user promise
   */
  const updateLocation = async (address: string): Promise<User> => {

    const response = await MapFunctions.fetchNewCoordinatesForAddress(address);
    const parsedCoordinates = await MapFunctions.parseCoordinates(response);
    const updatedUser = { ...user } as User;
    updatedUser.address = address;
    updatedUser.coordinates = parsedCoordinates;
    return updatedUser;
  };

  /**
   * Event handler for change password click
   */
  const onChangePassWordClick = () => {
    const url = process.env.REACT_APP_KEYCLOAK_URL;
    const realm = process.env.REACT_APP_KEYCLOAK_REALM;
    window.location.href = `${url}realms/${realm}/login-actions/reset-credentials`;
  };

  /**
   * Method for setting container related props to grid components
   *
   * @param direction flex direction
   * @returns grid properties
   */
  const getGridContainerProps = (direction?: GridDirection): GridProps => ({
    container: true,
    direction: direction || "row"
  });

  /**
   * Method for setting item related props to grid components
   *
   * @param xs sizing for xs breakpoint
   * @param md sizing for md breakpoint
   * @returns grid properties
   */
  const getGridItemProps = (xs?: boolean | GridSize, md?: boolean | GridSize): GridProps => ({
    item: true,
    xs,
    md
  });

  /**
   * Component render
   */
  return (
    <div>
      { renderMyInformationContent() }
    </div>
  );
};

export default withStyles(styles)(MyInfoTab);
