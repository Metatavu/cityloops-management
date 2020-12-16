import * as React from "react";

import { withStyles, WithStyles, Toolbar, Button, Typography } from "@material-ui/core";
import styles from "../../styles/components/search-hounds/search-hounds-editor";
import { Category, SearchHound } from "../../generated/client";
import strings from "../../localization/strings";
import "react-sortable-tree/style.css";
import GenericButton from "../generic/generic-button";
import AddIcon from "@material-ui/icons/AddCircle";
import HoundListItem from "./hound-list-item";
import HoundContent from "./hound-content";

/**
 * Component props
 */
interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  searchHounds: SearchHound[];
  selectedSearchHound?: SearchHound;
  onAddSearchHound: () => void;
  onSelectSearchHound: (searchHound: SearchHound) => void;
  onUpdateSearchHound: (searchHound: SearchHound) => void;
  onSaveSearchHounds: () => void;
  onDeleteSearchHound: (searchHound: SearchHound) => void;
}

/**
 * Functional component for search hounds editor
 */
const SearchHoundsEditor: React.FC<Props> = ({
  categories,
  searchHounds,
  selectedSearchHound,
  classes,
  onAddSearchHound,
  onSelectSearchHound,
  onUpdateSearchHound,
  onSaveSearchHounds,
  onDeleteSearchHound
}) => {

  /**
   * Renders user search hounds
   */
  const renderUserHounds = () => {
    if (searchHounds.length === 0) {
      return (
        <Typography variant="h3">
          { strings.searchHounds.noHounds }
        </Typography>
      );
    }

    return searchHounds.map(hound => {
      return (
        <HoundListItem
          searchHound={ hound }
          onClick={ () => onSelectSearchHound(hound) }
          onDeleteClick={ () => onDeleteSearchHound(hound) }
        />
      );
    });
  };

  /**
   * Renders search hound content
   */
  const renderSearchHoundContent = () => {
    if (!selectedSearchHound) {
      return null;
    }

    return (
      <HoundContent
        searchHound={ selectedSearchHound }
        categories={ categories }
        updateData={ onUpdateSearchHound }
      />
    );
  };

  /**
   * Component render
   */
  return (
    <div className={ classes.root }>
      <Toolbar className={ classes.toolbar }>
        <Button
          color="primary"
          startIcon={ <AddIcon /> }
          onClick={ () => onAddSearchHound() }
          style={{
            marginTop: 10,
            marginLeft: 10
          }}>
          { strings.searchHounds.addSearchHound }
        </Button>
        <GenericButton
          onClick={ () => onSaveSearchHounds() }
          text={ strings.generic.save }
          style={{
            backgroundColor: "#00B6ED",
            marginTop: 10,
            marginLeft: 10
          }}
        />
      </Toolbar>
      <div className={ classes.contentWrapper }>
        <div className={ classes.houndList }>
          { renderUserHounds() }
        </div>
        <div className={ classes.content }>
          { renderSearchHoundContent() }
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(SearchHoundsEditor);