import * as React from "react";
import { Checkbox, MenuItem, Typography, WithStyles, withStyles } from "@material-ui/core";
import styles from "../../styles/components/search-hounds/hound-content";
import { Category, SearchHound } from "../../generated/client";
import OutlinedTextField from "../generic/outlined-text-field";
import OutlinedSelect from "../generic/outlined-select";
import strings from "../../localization/strings";
import classNames from "classnames";
import moment from "moment";

/**
 * Interface representing component properties
 */
interface Props extends WithStyles<typeof styles> {
  searchHound: SearchHound;
  categories: Category[];
  updateData: (updatedSearchHound: SearchHound) => void;
}

/**
 * React functional component for SearchHound content
 */
const HoundContent: React.FC<Props> = props => {
  const {
    classes,
    searchHound,
    categories,
    updateData
  } = props;

  /**
   * Event handler for update search hound data
   *
   * @param event react change event
   */
  const updateSearchHoundData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (!name) {
      return;
    }

    updateData({ ...searchHound, [name]: value });
  };

  /**
   * Event handler for update search hound category
   *
   * @param event React change event
   * @param child child
   */
  const updateCategory = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => {
    const { value, name } = event.target;

    if (!name) {
      return;
    }

    updateData({ ...searchHound, [name]: value });
  };

  /**
   * Event handler for update search hounds notifications on
   *
   * @param event React change event
   * @param checked is checkbox checked or not
   */
  const updateNotifications = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.target;

    if (!name) {
      return;
    }

    updateData({ ...searchHound, [name]: checked });
  }

  /**
   * Renders categories to select
   */
  const renderCategories = () => {
    return categories.map(category => {
      return (
        <MenuItem key={ category.id } value={ category.id }>
          { category.name }
        </MenuItem>
      );
    });
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <OutlinedTextField
        key={ `searchHound-${searchHound.id}-name` }
        label={ strings.generic.name }
        value={ searchHound.name || "" }
        onChange={ updateSearchHoundData }
        type="string"
        name="name"
        className={ classes.marginTop }
      />

      <OutlinedSelect
        key={ `searchHound-${searchHound.id}-category` }
        label={ strings.searchHounds.category }
        name="categoryId"
        onChange={ updateCategory }
        value={ searchHound.categoryId }
        className={ classes.marginTop }
      >
        { renderCategories() }
      </OutlinedSelect>

      <div className={ classNames(classes.notificationsOnContainer, classes.marginTop) }>
        <Typography variant="body1">
          { strings.searchHounds.notificationOn }
        </Typography>
        <Checkbox
          key={ `searchHound-${searchHound.id}-notificationsOn` }
          checked={ searchHound.notificationsOn }
          onChange={ updateNotifications }
          name="notificationsOn"
          className={ classes.checkbox }
        />
      </div>
      <Typography variant="body2">
        { `${strings.searchHounds.expires}: ${moment(searchHound.expires).format("DD.MM.YYYY")}` }
      </Typography>
    </div>
  );
};

export default withStyles(styles)(HoundContent);