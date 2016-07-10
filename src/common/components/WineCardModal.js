import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import WineRemove from './WineRemove'
import {removeBottle, removeBottles} from '../actions'

export default class WineCardModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      openModal: false,
      removeBottlesCount: 1
    }
  }

  onRemoveBottle = (bottle) => {
    const {dispatch, wine} = this.props
    const isLastBottle = wine.bottles.length === 1
    dispatch(removeBottle(wine.id, bottle.id))
    if (isLastBottle) {
      this.setState({openModal: false})
    }
  }

  onRemoveBottles = (bottle) => {
    const {dispatch, wine} = this.props
    const {removeBottlesCount} = this.state
    dispatch(removeBottles(wine.id, removeBottlesCount))
    if (wine.count === removeBottlesCount) {
      this.setState({openModal: false})
    }
  }

  updateBottleCount = (evt, value) => {
    this.setState({removeBottlesCount: parseInt(value)})
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
              maxWidth: '600px'
            }}
            open={this.state.openModal}
          >
            <WineRemove
              wine={this.props.wine}
              removeBottle={this.onRemoveBottle}
              updateBottleCount={this.updateBottleCount}
              removeBottlesCount={this.state.removeBottlesCount}
              removeBottles={this.onRemoveBottles}
              />
          </Dialog>}
      </div>
    )
  }
}

WineCardModal.propTypes = {
  wine: PropTypes.object.isRequired
}
