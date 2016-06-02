import React, { PropTypes } from 'react';
import { AppBar, MenuItem, List, ListItem, MakeSelectable} from 'material-ui';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {spacing} from 'material-ui/styles';
import Cookies from 'cookies-js';

import {isLargeScreen} from '../constants/global';
import ResizingComponent from '../components/ResizingComponent';
import Notification from './Notification';
import customTheme from '../styles/theme';
import {version} from '../styles/version';
import {title} from '../styles/pageTitle';

const SelectableList = MakeSelectable(List);

const menuItems = [
    {primaryText: 'Home', value: '/', title: 'Dashboard'},
    {primaryText: 'Ajouter', value: '/add', title: 'Ajouter une bouteille'},
    {primaryText: 'Chercher', value: '/search', title: 'Retrouver une bouteille'},
    {primaryText: 'Supprimer', value: '/remove', title: 'Supprimer une bouteille'},
    {primaryText: 'Panier', value: '/basket', title: 'Panier'}
];

function getPageTitle(items, router) {
    const find = items.filter(item => {
        return router.isActive(item.value, true);
    });
    if (!find.length) {
        throw new Error('URL doesn\'t match any route');
    }
    return find[0].title;
}

export default class App extends ResizingComponent {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    static childContextTypes = {
        muiTheme: PropTypes.object
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(customTheme, { userAgent: false}),
        };
    }

    constructor(props, context) {
      context.debounceWait = 300;
      super(props, context);
      let largeScreen = isLargeScreen();

      this.state = {
        muiTheme: getMuiTheme(customTheme, { userAgent: false}),
        isLargeScreen: largeScreen,
        navDrawerOpen: largeScreen,
        mobileNav: false
      };
    }

    updateLayout() {
      let largeScreen = isLargeScreen();
      this.setState({isLargeScreen: largeScreen, navDrawerOpen: largeScreen || this.state.mobileNav});
      Cookies.set('deviceInfos', JSON.stringify({width: window.innerWidth, height: window.innerHeight}));
    }

    handleTouchTapLeftIconButton() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen,
            mobileNav: !this.state.mobileNav
        });
    }
    handleRequestChangeList(event, value) {
     this.context.router.push(value);
     this.setState({
       navDrawerOpen: this.state.isLargeScreen,
     });
   }
    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: this.state.isLargeScreen ? this.state.muiTheme.zIndex.navDrawer + 1 : this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: '0.5em',
            }
        };
        if (this.state.isLargeScreen) {
            styles.root.paddingLeft = 256;
            styles.content = {
                margin: '2em'
            };
        }

        return styles;
    }
    render() {
        const {navDrawerOpen, isLargeScreen} = this.state;
        const { location, children} = this.props;
        const { prepareStyles } = this.state.muiTheme;
        const styles = this.getStyles();
        const pageTitle = getPageTitle(menuItems, this.context.router);
        let docked = false;
        let showMenuIconButton = true;

        if (isLargeScreen) {
            docked = true;
            showMenuIconButton = false;
        }

        return(
            <div>
              <AppBar
                onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton.bind(this)}
                title="Give It To Me"
                zDepth={0}
                style={styles.appBar}
                showMenuIconButton={showMenuIconButton}
              />
              <Drawer
                style={styles.navDrawer}
                docked={docked}
                open={this.state.navDrawerOpen}
                onRequestChange={open => this.setState({navDrawerOpen: open, mobileNav: !this.state.mobileNav})}
              >
                <AppBar title="Menu" showMenuIconButton={false} />
                <SelectableList
                    value={location.pathname}
                    onChange={this.handleRequestChangeList.bind(this)}
                    >
                  {menuItems.map((item, index) => <ListItem key={index} primaryText={item.primaryText} value={item.value} />)}
                </SelectableList>
                <div style={version}>
                    {window.__CURRENT_VERSION__}
                </div>
              </Drawer>
              <section className="main-content" style={prepareStyles(styles.root)}>
                <div style={prepareStyles(styles.content)}>
                    <h1 style={title}>{pageTitle}</h1>
                    {children}
                    <Notification />
                </div>
              </section>
            </div>
        );
  }
}
