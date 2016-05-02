import React, { PropTypes } from 'react';
import { LeftNav, AppBar, MenuItem, List, ListItem} from 'material-ui';
import {getMuiTheme} from 'material-ui/lib/styles/theme-manager';
import Spacing from 'material-ui/lib/styles/spacing';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import Cookies from 'cookies-js';

import {LARGE_SCREEN_MIN} from '../constants/global';
import ResizingComponent from '../components/ResizingComponent';
import customTheme from '../styles/theme';

const SelectableList = SelectableContainerEnhance(List);

let isLargeScreen = function() {
    return window.innerWidth >= LARGE_SCREEN_MIN;
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
            muiTheme: getMuiTheme(customTheme),
        };
    }

    constructor(props, context) {
      context.debounceWait = 300;
      super(props, context);
      let largeScreen = isLargeScreen();

      this.state = {
        muiTheme: getMuiTheme(customTheme),
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
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: Spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: Spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`,
            }
        };
        if (this.state.isLargeScreen) {
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        }

        return styles;
    }
    render() {
        const {navDrawerOpen, isLargeScreen} = this.state;
        const { location, children } = this.props;
        const { prepareStyles } = this.state.muiTheme;
        const styles = this.getStyles();
        let docked = false;
        let showMenuIconButton = true;

        if (isLargeScreen) {
            docked = true;
            showMenuIconButton = false;

            styles.navDrawer = {
                zIndex: styles.appBar.zIndex - 1,
            };
            styles.root.paddingLeft = 256;
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
              <LeftNav
                style={styles.navDrawer}
                docked={docked}
                open={this.state.navDrawerOpen}
                onRequestChange={open => this.setState({navDrawerOpen: open, mobileNav: !this.state.mobileNav})}
              >
                <AppBar title="Menu" showMenuIconButton={false} />
                <SelectableList
                    subheader=""
                    valueLink={{value: this.state.selectedIndex, requestChange: this.handleRequestChangeList.bind(this)}} >
                  <ListItem primaryText="Home" value="/" />
                  <ListItem primaryText="Ajouter" value="/add" />
                  <ListItem primaryText="Chercher" value="/search" />
                  <ListItem primaryText="Supprimer" value="/remove" />
                </SelectableList>
              </LeftNav>
              <section className="main-content" style={prepareStyles(styles.root)}>
                <div style={prepareStyles(styles.content)}>
                    {children}
                </div>
              </section>
            </div>
        );
  }
}
