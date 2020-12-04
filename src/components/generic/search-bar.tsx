import * as React from "react";
import { Button, MenuItem, TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/search-bar";
import strings from "../../localization/strings";
import { Category } from "../../generated/client";
import { SearchParams } from "../../types";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  onSearch?: (searchParams: SearchParams) => void;
}

/**
 * Search bar component
 *
 * @param props component properties
 */
const SearchBar: React.FC<Props> = props => {
  const { classes, categories, onSearch } = props;

  const [ searchTerm, setSearchTerm ] = React.useState<string>("");
  const [ selectedCategory, setSelectedCategory ] = React.useState<Category>();

  /**
   * Event handler for change term
   *
   * @param event React change event
   */
  const onChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Event handler for change category
   *
   * @param event React change event
   */
  const onChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = categories.find(category => category.id === event.target.value);
    if (category) {
      setSelectedCategory(category);
    }
  };

  /**
   * Event handler for search button click
   */
  const onSearchClick = () => {
    if (onSearch) {
      /**
       * TODO: Add support for search string and location
       */
      const searchParams: SearchParams = {
        category: selectedCategory
      };
      onSearch(searchParams);
    }
  };

  /**
   * Renders search field
   */
  const renderSearchField = () => {
    return (
      <TextField
        size="small"
        variant="filled"
        className={ classes.searchField }
        placeholder={ strings.generic.search }
        value={ searchTerm }
        onChange={ onChangeTerm }
      />
    );
  };

  /**
   * Renders category select field
   */
  const renderCategorySelect = () => {
    return (
      <TextField
        select
        size="small"
        variant="filled"
        className={ classes.selectField }
        label={ strings.search.category }
        value={ selectedCategory }
        onChange={ onChangeCategory }
      >
        { categories.map(category =>
          <MenuItem key={ category.id } value={ category.id }>
            { category.name }
          </MenuItem>
        )}
      </TextField>
    );
  };

  /**
   * Renders agency select field
   */
  const renderAgencySelect = () => {
    return (
      <TextField
        select
        size="small"
        variant="filled"
        className={ classes.selectField }
        label={ strings.search.agency }
        value={ selectedCategory }
      >
        {
          /**
           * TODO:
           * Add agency options to search
           */
        }
      </TextField>
    );
  };

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      { renderSearchField() }
      { renderCategorySelect() }
      { renderAgencySelect() }
      <Button
        size="small"
        variant="contained"
        color="secondary"
        className={ classes.submitButton }
        onClick={ onSearchClick }
      >
        { strings.generic.search }
      </Button>
    </div>
  );
};

export default withStyles(styles)(SearchBar);