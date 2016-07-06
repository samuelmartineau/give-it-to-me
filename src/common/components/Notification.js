import React, {Component} from 'react'
import Snackbar from 'material-ui/Snackbar'

import {hideNotification} from '../actions'

export default class Notification extends Component {
  state = {
    open: false
  }

  handleRequestClose () {
    const {dispatch} = this.props
    dispatch(hideNotification())
  }

  render () {
    const {
      success,
      error,
      message = '',
      open = false
    } = this.props
    let backgroundColor
    if (open && success) {
      backgroundColor = 'green'
    } else if (open && error) {
      backgroundColor = 'red'
    }

    return (<Snackbar bodyStyle={{
      backgroundColor: backgroundColor
    }} open={open} message={message} autoHideDuration={6000} onRequestClose={this.handleRequestClose.bind(this)} />)
  }
}
