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
  const [ selectedAgency, setSelectedAgency ] = React.useState<string>();

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
    setSelectedCategory(categories.find(category => category.id === event.target.value));
  };

  /**
   * Event handler for change agency
   * 
   * @param event React change event
   */
  const onChangeAgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * TODO: Add support for agencies
     */
    const { value } = event.target;
    setSelectedAgency(value !== "noFilter" ? value : undefined);
  }

  /**
   * Event handler for search button click
   */
  const onSearchClick = () => {
    /**
     * TODO: Add support for search string and location
     */
    onSearch && onSearch({
      category: selectedCategory
    });
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
        value={ selectedCategory?.id || "noFilter" }
        onChange={ onChangeCategory }
      >
        { renderEmptyItem() }
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
        value={ selectedAgency || "noFilter" }
        onChange={ onChangeAgency }
      >
        { renderEmptyItem() }
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
   * Renders empty item
   */
  const renderEmptyItem = () => {
    return (
      <MenuItem key="noFilter" value="noFilter">
        { strings.search.noFilter }
      </MenuItem>
    );
  }

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