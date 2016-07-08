import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import WineRemove from './WineRemove'
import {removeBottle} from '../actions'

export default class WineCardModal extends Component {

  constructor (props) {
    super(props)
    this.removeBottle = this.removeBottle.bind(this)
    this.state = {
      openModal: false
    }
  }

  removeBottle = (bottle) => {
    const {dispatch, wine} = this.props
    dispatch(removeBottle(wine.id, bottle.id))
  }

  updateBottleCount = (bottleCount) => {
    const {dispatch, wine} = this.props
    dispatch(removeBottle(wine.id, bottle.id))
  }

  handleOpenModal = () => {
    this.setState({openModal: true})
  }

  handleCloseModal = () => {
    this.setState({openModal: false})
  }

  render () {
    const actions = [
      <FlatButton
        label='Retour'
        keyboardFocused
        primary
        onTouchTap={this.handleCloseModal}
      />
    ]

    return (
      <div>
        <RaisedButton
          label='Suppression de bouteille'
          primary
          onTouchTap={this.handleOpenModal}
        />
        {this.state.openModal &&
          <Dialog
            title='Suppression de bouteille'
            actions={actions}
            modal={false}
            autoScrollBodyContent
            onRequestClose={this.handleCloseModal}
            contentStyle={{
              width: '100%',
              maxWidth: 'none'
            }}
            open={this.state.openModal}
          >
            <WineRemove
              wine={this.props.wine}
              removeBottle={this.removeBottle}
              updateBottleCount={this.updateBottleCount}
              />
          </Dialog>}
      </div>
    )
  }
}

WineCardModal.propTypes = {
  wine: PropTypes.object.isRequired,
  basketWine: PropTypes.object
}
