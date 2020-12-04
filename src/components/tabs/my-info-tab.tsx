import * as React from "react";
import styles from "../../styles/components/generic/item-form-dialog";
import strings from "../../localization/strings";
import { TextField, Typography, WithStyles, withStyles, Grid, GridDirection, GridProps, GridSize } from '@material-ui/core';
import { gt } from "lodash";
import Map from "../generic/map";
import { LocationInfo, User } from "../../generated/client";
import GenericButton from "../generic/generic-button"
import produce from "immer";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {

  coordinates: any;
  user?: User;
}

/**
 * Functional component for user information editing tab
 */
const MyInfoTab: React.FC<Props> = props => {
  const {
    classes,
    coordinates,
    user
  } = props;




  const renderTextField = (key: string, displayName: string, value: string) => {

    return (
      <TextField
        key={ key }
        label={ displayName }
        value={ value }
        className={ classes.propertyField }
        variant="outlined"
        size="medium"
        fullWidth
      />
    )
  };

  /**
   * Renders item column content
   */
  const renderMyInformationContent = () => {

    return (
      <>
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
            { user?.companyAccount && renderTextField("", "Y-Tunnus", user?.email || "" ) }
            { renderTypography(strings.user.contactInformation) }
            { renderTextField("name", strings.user.phoneNumber, user?.phoneNumber || "") }
            { renderTextField("Y-Tunnus", strings.user.email, user?.email || "" ) }
            <GenericButton
              text={strings.user.changePassword}
            />
            <GenericButton 
              text={strings.generic.save}
            />
          </Grid>
          <Grid
            { ...getGridItemProps(12, 6) }
            className={ classes.column }
          >
            { user?.companyAccount && renderTextField("", strings.search.agency, "" || "" ) }
            { renderTextField("address", strings.user.address, user?.address || "" ) }
            { renderMap() }

          </Grid>
        </Grid>
        </Grid>
      </>
    );
  }

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
   * Renders map component
   */
  const renderMap = () => {

    return (
      <Map
        locationInfo={ coordinates }
      />
    );
  };

  const renderTypography = (label: string) => {
    
    return (
      <Typography
              variant="h2"
              className={ classes.propertyField }
            >
              { label }
            </Typography>
    )
  }


  return (
    <div>
      { renderMyInformationContent() }
    </div>
  );
};

export default withStyles(styles)(MyInfoTab);