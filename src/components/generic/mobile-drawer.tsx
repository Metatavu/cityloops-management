import * as React from "react";
import { Drawer, Hidden, List, ListItem, ListItemIcon, Typography, withStyles, WithStyles } from "@material-ui/core";
import { styles } from "../../styles/components/generic/mobile-drawer";
import strings from "../../localization/strings";
import ListIcon from "@material-ui/icons/List";

/**
 * Interface describing properties from screen component
 */
export interface ScreenProps {
  title?: string;
  logoUrl?: string;
}

/**
 * Interface describing other properties
 */
interface OtherProps extends WithStyles<typeof styles> {
  open: boolean;
  toggleSideMenu: () => void;
}

/**
 * Intersection type for all component properties
 */
type Props = ScreenProps & OtherProps;

/**
 * Mobile drawer component
 * 
 * @param props component props
 */
const MobileDrawer: React.FC<Props> = ({
  classes,
  open,
  title,
  logoUrl,
  toggleSideMenu,
}) => {

  /**
   * Renders drawer content
   */
  const renderDrawerContent = () => {
    return (
      <div className={ classes.drawerContent }>
        { logoUrl &&
        <div className={ classes.logoArea }>
          <div className={ classes.logoCircle }>
            <img
              alt="logo"
              src={ logoUrl }
              className={ classes.logo }
            />
          </div>
        </div>
        }
        { title &&
          <Typography
            variant="h3"
            className={ classes.title }
          >
            { title }
          </Typography>
        }
        <List className={ classes.menu }>
          {
            renderListItem(
              strings.items.postings,
              navigateTo,
              { boldText: true, icon: <ListIcon fontSize="large" /> },
              "/items",
            )
          }
        </List>
      </div>
    );
  }

  /**
   * Renders list item
   * 
   * @param name item name
   * @param action action that is triggered when list item is clicked
   * @param boldText is item name written in bold
   * @param icon possible icon
   * @param path to navigate
   */
  const renderListItem = (
    name: string,
    action: (path?: string) => void,
    options?: { boldText?: boolean, icon?: JSX.Element },
    path?: string,
  ) => {
    return (
      <ListItem
        button
        className={ classes.listItem }
        onClick={ () => action(path) }
      >
        { options?.icon &&
          <ListItemIcon className={ classes.listIcon }>
            { options.icon }
          </ListItemIcon>
        }
        <Typography
          variant="h6"
          style={{ fontWeight: options?.boldText ? "bold" : "initial" }}
        >
          { name }
        </Typography>
      </ListItem>
    );
  }

  /**
   * Navigates to given path
   *
   * @param path path
   */
  const navigateTo = (path?: string) => {
    if (path) {
      window.location.href = path;
    }
  }

  /**
   * Component render
   */
  return (
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="left"
        open={ open }
        onClose={ toggleSideMenu }
        ModalProps={{
          keepMounted: true
        }}
      >
        { renderDrawerContent() }
      </Drawer>
    </Hidden>
  );
}

export default withStyles(styles)(MobileDrawer);