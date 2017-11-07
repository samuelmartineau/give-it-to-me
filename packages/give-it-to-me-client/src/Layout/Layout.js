import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import Drawer from "material-ui/Drawer";
import Hidden from "material-ui/Hidden";
import { compose } from "recompose";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import Menu from "./Menu";

const styleSheet = theme => ({
  layout: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100vh",
    width: "100%"
  },
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    transition: theme.transitions.create("width")
  },
  content: theme.mixins.gutters({
    paddingTop: 80,
    flex: "1 1 100%",
    maxWidth: "100%",
    margin: "0 auto"
  }),
  [theme.breakpoints.up(948)]: {
    content: {
      maxWidth: 900
    }
  },
  primary: {
    color: theme.palette.primary[500]
  },
  [theme.breakpoints.up("lg")]: {
    appBarShift: {
      width: "calc(100% - 250px)"
    },
    drawer: {
      width: "250px"
    },
    navIconHide: {
      display: "none"
    }
  }
});

class AppFrame extends Component {
  state = {
    drawerOpen: false
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { width, classes, title } = this.props;
    const drawerDocked = isWidthUp("lg", width);

    const drawer = (
      <div className="">
        <Toolbar className="">
          <Typography type="title" gutterBottom color="inherit">
            AXA
          </Typography>
          <Divider absolute />
        </Toolbar>
        <Menu />
      </div>
    );

    return (
      <div className={classes.layout}>
        <AppBar className={classNames(classes.appBar, classes.appBarShift)}>
          <Toolbar>
            <IconButton
              color="contrast"
              onClick={this.handleDrawerToggle}
              className={classNames(classes.icon, classes.navIconHide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className="">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.drawer}>
          <Hidden lgUp>
            <Drawer
              classes={{
                paper: classes.paper
              }}
              type="temporary"
              open={drawerDocked || this.state.drawerOpen}
              onRequestClose={this.handleDrawerClose}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden lgDown implementation="css">
            <Drawer
              classes={{
                paper: classes.paper
              }}
              type="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </div>

        <div className={classNames(classes.content, classes.root)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Layout = compose(withWidth(), withStyles(styleSheet))(AppFrame);

export const LayoutHoc = Component => props => (
  <Layout {...props}>
    <Component />
  </Layout>
);
export default Layout;
