import * as React from "react";
import { Button, MenuItem, TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from "../../styles/components/generic/search-bar";
import strings from "../../localization/strings";
import { Category } from "../../generated/client";
import { CategoryDataHolder, SearchParams } from "../../types";
import { TreeDataUtils } from "../../utils/tree-data-utils";
import SearchIcon from "@material-ui/icons/Search";

/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  onSearch?: (searchParams: SearchParams) => void;
  locale: string;
}

/**
 * Search bar component
 *
 * @param props component properties
 */
const SearchBar: React.FC<Props> = props => {
  const { classes, categories, onSearch } = props;

  // const [ searchTerm, setSearchTerm ] = React.useState<string>("");
  const [ selectedCategory, setSelectedCategory ] = React.useState<Category>();
  // const [ selectedAgency, setSelectedAgency ] = React.useState<string>();

  // /**
  //  * Event handler for change term
  //  *
  //  * @param event React change event
  //  */
  // const onChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  /**
   * Event handler for change category
   *
   * @param event React change event
   */
  const onChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(categories.find(category => category.id === event.target.value));
  };

  // /**
  //  * Event handler for change agency
  //  * 
  //  * @param event React change event
  //  */
  // const onChangeAgency = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   /**
  //    * TODO: Add support for agencies
  //    */
  //   const { value } = event.target;
  //   setSelectedAgency(value !== "noFilter" ? value : undefined);
  // }

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

  // Text and agency search are not needed at the moment
  // /**
  //  * Renders search field
  //  */
  // const renderSearchField = () => {
  //   return (
  //     <TextField
  //       size="small"
  //       variant="filled"
  //       className={ classes.searchField }
  //       placeholder={ strings.generic.search }
  //       value={ searchTerm }
  //       onChange={ onChangeTerm }
  //     />
  //   );
  // };

  /**
   * Renders category select field
   */
  const renderCategorySelect = () => {

    const sortedCategories = TreeDataUtils.constructTreeData(categories);

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
        { renderMenuItem("noFilter", "noFilter", strings.search.noFilter, 0) }
        { renderTreeStructure(sortedCategories, 0) }
      </TextField>
    );
  };


  /**
   * Renders item type select field
   */
  const renderItemTypeSelect = () => {

    const sortedCategories = TreeDataUtils.constructTreeData(categories);

    return (
      <TextField
        select
        size="small"
        variant="filled"
        className={ classes.selectField }
        label={ strings.search.type }
        value={ selectedCategory?.id || "noFilter" }
        onChange={ onChangeCategory }
      >
        { renderMenuItem("noFilter", "noFilter", strings.search.noFilter, 0) }
        { renderTreeStructure(sortedCategories, 0) }
      </TextField>
    );
  };

  // Text and agency search are not needed at the moment
  // /**
  //  * Renders agency select field
  //  */
  // const renderAgencySelect = () => {
  //   return (
  //     <TextField
  //       select
  //       size="small"
  //       variant="filled"
  //       className={ classes.selectField }
  //       label={ strings.search.agency }
  //       value={ selectedAgency || "noFilter" }
  //       onChange={ onChangeAgency }
  //     >
  //       { renderEmptyItem() }
  //       {
  //         /**
  //          * TODO:
  //          * Add agency options to search
  //          */
  //       }
  //     </TextField>
  //   );
  // };

  /**
   * Renders tree category structure
   *
   * @param categoryData list of category data holders
   * @param level tree level
   */
  const renderTreeStructure = (categoryData: CategoryDataHolder[], level: number) => {
    const elements: JSX.Element[] = [];
    categoryData.forEach(data => {
      elements.push(renderMenuItem(data.category.id || "", data.category.id || "", data.category.name, level));
      if (data.childCategories.length > 0) {
        const newLevel = level + 20;
        elements.push(...renderTreeStructure(data.childCategories, newLevel));
      }
    });

    return elements;
  };

  /**
   * Renders menu item
   *
   * @param key menu item key
   * @param value menu item value
   * @param title menu item title
   * @param level menu item level
   */
  const renderMenuItem = (key: string, value: string, title: string, level: number) => {
    return (
      <MenuItem
        key={ key }
        value={ value }
        style={{ marginLeft: level, fontWeight: level === 0 ? 600 : 400 }}
      >
        { title }
      </MenuItem>
    );
  }

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      {/* Text and agency search are not needed at the moment.*/}
      {/* { renderSearchField() } */}
      { renderCategorySelect() }
      { renderItemTypeSelect() }
      {/* { renderAgencySelect() } */}
      <Button
        startIcon={ <SearchIcon /> }
        variant="contained"
        color="primary"
        className={ classes.submitButton }
        onClick={ onSearchClick }
      >
        { strings.generic.search }
      </Button>
    </div>
  );
};

export default withStyles(styles)(SearchBar);