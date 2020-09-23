import * as React from "react";
import { Drawer, Hidden, List, ListItem, ListItemIcon, Typography, withStyles, WithStyles } from "@material-ui/core";
import { styles } from "../../styles/components/generic/mobile-drawer";
import strings from "../../localization/strings";
import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
 * Top bar component
 * 
 * @param props component props
 */
const ResponsiveSideMenu: React.FC<Props> = ({
  classes,
  open,
  title,
  logoUrl,
  toggleSideMenu
}) => {

  /**
   * Renders drawer content
   */
  const renderDrawerContent = () => {
    return (
      <div className={ classes.drawerContent }>
        <div className={ classes.logoArea }>
          { logoUrl &&
            <div className={ classes.logoCircle }>
              <img
                alt="logo"
                src={ logoUrl }
                className={ classes.logo }
              />
            </div>
          }
        </div>
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
              { boldText: true, icon: <ListIcon fontSize="large" /> }
            )
          }
          {
            renderListItem(
              strings.items.newPosting,
              { icon: <AddCircleOutlineIcon fontSize="large" /> }
            )
          }
          {
            renderListItem(
              strings.user.account,
              { icon: <AccountCircleIcon fontSize="large" /> }
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
   * @param boldText is item name written in bold
   * @param icon possible icon
   */
  const renderListItem = (name: string, options?: { boldText?: boolean, icon?: JSX.Element }) => {
    return (
      <ListItem
        button
        className={ classes.listItem }
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

export default withStyles(styles)(ResponsiveSideMenu);