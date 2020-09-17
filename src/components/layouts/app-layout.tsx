import { Container, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import styles from "../../styles/components/layouts/app-layout";
import Header from "../generic/header";
import { HeaderProps } from "../generic/header";
import Footer from "../generic/footer";
import { FooterProps } from "../generic/footer";


/**
 * Interface describing component properties
 */
interface Props extends WithStyles<typeof styles> {
  title?: string;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
}

/**
 * Functional component for app layout
 * 
 * @param props component props
 */
const AppLayout: React.FC<Props> = props => {
  const {
    title,
    children,
    classes,
    headerProps,
    footerProps
  } = props;

  return (
    <div className={ classes.root }>
      <Header
        title={ title }
        { ...headerProps }
      />
      <div className={ classes.scrollWrapper }>
        <Container
          maxWidth="xl"
          disableGutters
        >
          <div className={ classes.contentWrapper }>
            { children }
          </div>
        </Container>
        <Footer { ...footerProps } />
      </div>
    </div>
  );
}

export default withStyles(styles)(AppLayout);