import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import WineRemove from './WineRemove'

export default class WineCardModal extends Component {

  state = {
    openModal: false
  }

  removeCell = () => {
    debugger
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
              removeCell={this.removeCell}
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
