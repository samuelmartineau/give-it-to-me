import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {spacing} from 'material-ui/styles'
import Cookies from 'cookies-js'
import {connect} from 'react-redux'

import {isLargeScreen} from '../constants/global'
import ResizingComponent from '../components/ResizingComponent'
import customTheme from '../styles/theme'
import {version} from '../styles/version'
import {title} from '../styles/pageTitle'
import Menu, {menuItems} from '../components/Menu'
import Notification from '../components/Notification'

function getPageTitle (items, router) {
  const find = items.filter(item => {
    return router.isActive(item.value, true)
  })
  if (!find.length) {
    throw new Error('URL doesn\'t match any route')
  }
  return find[0].title
}

class App extends ResizingComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(customTheme, {userAgent: false})
    }
  }

  constructor (props, context) {
    context.debounceWait = 300
    super(props, context)
    let largeScreen = isLargeScreen()

    this.state = {
      muiTheme: getMuiTheme(customTheme, {userAgent: false}),
      isLargeScreen: largeScreen,
      navDrawerOpen: largeScreen,
      mobileNav: false
    }
  }

  updateLayout () {
    let largeScreen = isLargeScreen()
    this.setState({
      isLargeScreen: largeScreen,
      navDrawerOpen: largeScreen || this.state.mobileNav
    })
    Cookies.set('deviceInfos', JSON.stringify({width: window.innerWidth, height: window.innerHeight}))
  }

  handleTouchTapLeftIconButton () {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
      mobileNav: !this.state.mobileNav
    })
  }
  handleRequestChangeList (event, value) {
    this.context.router.push(value)
    this.setState({navDrawerOpen: this.state.isLargeScreen})
  }
  getStyles () {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.isLargeScreen
          ? this.state.muiTheme.zIndex.navDrawer + 1
          : this.state.muiTheme.zIndex.appBar + 1,
        top: 0
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: '0.5em'
      }
    }
    if (this.state.isLargeScreen) {
      styles.root.paddingLeft = 256
      styles.content = {
        margin: '2em'
      }
    }

    return styles
  }
  render () {
    const {children, favorite, location} = this.props
    const {navDrawerOpen, isLargeScreen} = this.state
    const {prepareStyles} = this.state.muiTheme
    const styles = this.getStyles()
    const pageTitle = getPageTitle(menuItems, this.context.router)
    let docked = false
    let showMenuIconButton = true

    if (isLargeScreen) {
      docked = true
      showMenuIconButton = false
    }

    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton.bind(this)} title='Give It To Me' zDepth={0} style={styles.appBar} showMenuIconButton={showMenuIconButton} />
        <Drawer style={styles.navDrawer} docked={docked} open={navDrawerOpen} onRequestChange={open => this.setState({
          navDrawerOpen: open,
          mobileNav: !this.state.mobileNav
        })}>
          <AppBar title='Menu' showMenuIconButton={false} key={0} />
          <Menu key={1} favorite={favorite} handleRequestChangeList={this.handleRequestChangeList.bind(this)} location={location} />
          <div key={2} style={version}>
            {window.__CURRENT_VERSION__}
          </div>
        </Drawer>
        <section className='main-content' style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
            <h1 style={title}>{pageTitle}</h1>
            {children}
            <Notification {...this.props} />
          </div>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  favorite: state.cellar.wines.filter(wine => wine.isFavorite),
  ...state.notification
}))(App)
