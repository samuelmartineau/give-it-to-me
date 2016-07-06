import React, {Component, PropTypes} from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'

import CellsSelector from './CellsSelector'
import * as cellSelectorStyle from '../styles/cellSelector'
import {selectNextBox} from '../actions'

export default class CellsSelectors extends Component {
  constructor (props) {
    super(props)
    this.onSelectNextBox = this.onSelectNextBox.bind(this)
  }

  onSelectNextBox () {
    const {dispatch} = this.props
    dispatch(selectNextBox())
  }

  render () {
    const {selectedCells} = this.props

    return (
      <div>
        <div style={cellSelectorStyle.cellSelectorAddButton}>
          <RaisedButton
            onClick={this.onSelectNextBox}
            label='Ajouter une caisse'
            labelPosition='after'
            primary
            icon={< ContentAdd />} />
        </div>
        <div style={cellSelectorStyle.cellSelectorContainer}>
          {Object.keys(selectedCells).map((box, index) => {
            return <CellsSelector
              key={index}
              {...this.props}
              boxId={parseInt(box)} />
          })}
        </div>
      </div>
    )
  }
}

CellsSelectors.propTypes = {
  selectedCells: PropTypes.object.isRequired,
  selectableCells: PropTypes.object.isRequired
}
