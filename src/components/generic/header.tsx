import * as React from "react";

import { AppBar, IconButton, Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import styles from "../../styles/components/generic/header";
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import CityLoopsLogo from "../../resources/svg-paths/logo-white";

/**
 * Interface describing component properties
 */
export interface HeaderProps {
  onAddItemClick?: () => void;
}

type Props = WithStyles<typeof styles> & { title?: string };

/**
 * Functional component for app header
 * 
 * @param props component props
 */
const Header: React.FC<HeaderProps & Props> = props => {
  const { title, classes, onAddItemClick } = props;

  return (
    <div className={ classes.root }>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon fontSize="large" style={{ color: "#fff" }} />
          </IconButton>
          { title ? (
            <Typography variant="h6">
              { title }
            </Typography>
          ) : (
            <CityLoopsLogo />
          )}
          <IconButton style={{ marginLeft: "auto" }} onClick={ onAddItemClick && onAddItemClick }>
            <AddCircleOutlineIcon fontSize="large" style={{ color: "#fff" }}/>
          </IconButton>
          <IconButton>
            <SearchIcon fontSize="large" style={{ color: "#fff" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);