import * as React from "react";
import {  Category, SearchHound } from "../../generated/client";
import { SignedToken } from "../../types";
import Api from "../../api/api";
import { produce } from "immer";
import SearchHoundsEditor from "../search-hounds/search-hounds-editor";
import moment from "moment";
import strings from "../../localization/strings";
import GenericConfirmDialog from "../generic/generic-confirm-dialog";

/**
 * Interface representing component properties
 */
interface Props {
  signedToken?: SignedToken;
}

/**
 * Interface representing component states
 */
interface State {
  loading: boolean;
  categories: Category[];
  searchHounds: SearchHound[];
  selectedSearchHound?: SearchHound;
  deleteDialogOpen: boolean;
  successDialogOpen: boolean;
  error: boolean;
}

/**
 * Class component for search hounds provider
 */
class SearchHoundsProvider extends React.Component<Props, State> {

  /**
   * Constructor
   *
   * @param props component properties
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
      searchHounds: [],
      deleteDialogOpen: false,
      successDialogOpen: false,
      error: false
    };
  }

  /**
   * Component did mount life cycle handler
   */
  public componentDidMount = () => {
    this.listSearchHounds()
    .then(searchHounds => this.setState({ searchHounds }))
    .catch(error => console.error(error));

    this.listCategories()
    .then(categories => this.setState({ categories }))
    .catch(error => console.error(error));
  }

  /**
   * Component render
   */
  public render = () => {
    const {
      categories,
      searchHounds,
      selectedSearchHound,
    } = this.state;

    return (
      <>
        <SearchHoundsEditor
          categories={ categories }
          searchHounds={ searchHounds }
          selectedSearchHound={ selectedSearchHound }
          onAddSearchHound={ this.onAddSearchHoundClick }
          onSelectSearchHound={ this.onSearchHoundClick }
          onSaveSearchHounds={ this.onSearchHoundSave }
          onDeleteSearchHound={ this.onSearchHoundDeleteClick }
          onUpdateSearchHound={ this.updateSearchHoundToState }
        />
        { this.renderConfirmDialog() }
        { this.renderSuccessDialog() }
      </>
    );
  }

  /**
   * Renders confirmation dialog
   */
  private renderConfirmDialog = () => {
    const { selectedSearchHound, deleteDialogOpen } = this.state;

    const deleteDialogTitle = selectedSearchHound ?
      strings.formatString(
        strings.generic.customConfirmDelete,
        strings.categories.category.toLowerCase(),
        selectedSearchHound.name
      ) as string :
      undefined;

    return (
      <GenericConfirmDialog
        open={ deleteDialogOpen }
        title={ deleteDialogTitle }
        confirmButtonText={ strings.generic.confirmDelete }
        cancelButtonText={ strings.generic.cancel }
        onCancel={ () => this.setState({ deleteDialogOpen: false }) }
        onClose={ () => this.setState({ deleteDialogOpen: false }) }
        onConfirm={ this.onConfirmDelete }
      />
    );
  }
  
  /**
   * Renders success dialog
   */
  private renderSuccessDialog = () => {
    const { successDialogOpen, error } = this.state;

    return (
      <GenericConfirmDialog
        open={ successDialogOpen }
        title={ error ? strings.generic.saveError : strings.generic.saveSuccessful }
        confirmButtonText={ strings.generic.close }
        cancelButtonText={ strings.generic.close }
        onCancel={ () => this.setState({ successDialogOpen: false }) }
        onClose={ () => this.setState({ successDialogOpen: false }) }
        onConfirm={ () => this.setState({ successDialogOpen: false }) }
      />
    );
  }

  /**
   * Create searchHound to DB
   */
  private onAddSearchHoundClick = () => {
    const { signedToken } = this.props;
    const { categories } = this.state;

    if (!signedToken || ! signedToken.userId || categories.length < 1) {
      return;
    }

    const newSearchHound: SearchHound = {
      name: strings.searchHounds.newHound,
      categoryId: categories[0].id!!,
      notificationsOn: false,
      expires: moment(new Date()).add(6, "month").toDate(),
      userId: signedToken.userId
    };

    this.createSearchHound(newSearchHound)
    .then(createdSearchHound => {
      this.setState({
        searchHounds: [ ...this.state.searchHounds, createdSearchHound],
        selectedSearchHound: createdSearchHound
      });
    })
    .catch(error => {
      console.error(error)
      this.setState({
        error: true,
        successDialogOpen: true
      });
    });
  };

  /**
   * Event handler for search hound click
   *
   * @param clickedSearchHound clicked search hound
   */
  private onSearchHoundClick = async (clickedSearchHound: SearchHound) => {
    this.setState({ selectedSearchHound: clickedSearchHound });
  }

  /**
   * Event handler for update search hound to state
   *
   * @param searchHound search hound to update
   */
  private updateSearchHoundToState = (searchHound: SearchHound) => {
    this.setState(
      produce((draft: State) => {
        const houndIndex = draft.searchHounds.findIndex(hound => hound.id === searchHound.id);
        if (houndIndex > -1) {
          draft.searchHounds.splice(houndIndex, 1, searchHound);
        }
        draft.selectedSearchHound = searchHound;
      })
    );
  }

  /**
   * Event handler for save search hound click
   */
  private onSearchHoundSave = async () => {
    const { selectedSearchHound } = this.state;

    if (!selectedSearchHound) {
      return;
    }

    this.updateSearchHound(selectedSearchHound)
      .then(updatedHound => {
        this.setState({
          selectedSearchHound: updatedHound,
          successDialogOpen: true
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          error: true,
          successDialogOpen: true
        });
      });
  }

  /**
   * Event handler for search hound delete click
   *
   * @param searchHoundToDelete search hound to delete 
   */
  private onSearchHoundDeleteClick = (searchHoundToDelete: SearchHound) => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return;
    }

    this.setState({
      selectedSearchHound: searchHoundToDelete,
      deleteDialogOpen: true
    });
  }

  /**
   * Get search hound data form API
   *
   * @returns return search hound list promise
   */
  private listSearchHounds = async (): Promise<SearchHound[]> => {
    const { signedToken } = this.props;

    if (!signedToken || !signedToken.userId) {
      return Promise.reject("No signed token");
    }

    const searchHoundsApi = Api.getSearchHoundsApi(signedToken);
    return await searchHoundsApi.listSearchHounds({ userId: signedToken.userId });
  };

  /**
   * Get search hound data form API
   *
   * @returns promise with type SearchHound
   */
  private listCategories = async (): Promise<Category[]> => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return Promise.reject("No signed token");
    }

    const categoriesApi = Api.getCategoriesApi(signedToken);
    return await categoriesApi.listCategories({  });
  };

  /**
   * Create search hound to DB
   *
   * @param newSearchHound searchHound to be created
   * @returns promise with type SearchHound
   */
  private createSearchHound = async (newSearchHound: SearchHound): Promise<SearchHound> => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return Promise.reject("No signed token");
    }

    const searchHoundsApi = Api.getSearchHoundsApi(signedToken);
    return await searchHoundsApi.createSearchHound({
      searchHound: newSearchHound
    });
  }

  /**
   * Update searchHound to API
   *
   * @param searchHoundToUpdate search hound to update
   * @returns promise with type SearchHound
   */
  private updateSearchHound = async (searchHoundToUpdate: SearchHound): Promise<SearchHound> => {
    const { signedToken } = this.props;

    if (!signedToken || !searchHoundToUpdate.id) {
      return Promise.reject("No signed token or search hound id was null");;
    }

    const categoriesApi = Api.getSearchHoundsApi(signedToken);
    return await categoriesApi.updateSearchHound({
      searchHoundId: searchHoundToUpdate.id,
      searchHound: searchHoundToUpdate
    });
  };

  /**
   * Event handler for modal confirm delete click
   */
  private onConfirmDelete = () => {
    const { selectedSearchHound } = this.state;

    if (!selectedSearchHound) {
      return;
    }

    this.setState({
      searchHounds: this.state.searchHounds.filter(hound => hound.id !== selectedSearchHound.id),
      selectedSearchHound: undefined,
      deleteDialogOpen: false
    });
    this.deleteSearchHound(selectedSearchHound)
      .catch(error => {
        console.error(error)
        this.setState({
          error: true,
          successDialogOpen: true
        });
      });
  }

  /**
   * Delete search hound from DB
   *
   * @param searchHoundToDelete searchHound to delete
   * @returns promise with type SearchHound
   */
  private deleteSearchHound = async (searchHoundToDelete: SearchHound): Promise<void> => {
    const { signedToken } = this.props;

    if (!signedToken) {
      return;
    }

    const categoriesApi = Api.getSearchHoundsApi(signedToken);
    return await categoriesApi.deleteSearchHound({
      searchHoundId: searchHoundToDelete.id!!
    });
  };
}

export default SearchHoundsProvider;
