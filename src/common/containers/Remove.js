import React, {Component} from 'react'
import {connect} from 'react-redux'

import CellsSelector from '../components/CellsSelector'
import CellarSchema from '../components/CellarSchema'

class Remove extends Component {
  state = {}

  render () {
    const {wines, selectedCells, bottlesByBoxes, availableCells} = this.props
    const boxId = Object.keys(selectedCells)[0]
    return (
      <div>
        <CellarSchema
          wines={wines}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}}
          overviewMode />
        <CellsSelector
          selectableCells={{}}
          bottlesByBoxes={bottlesByBoxes}
          selectedCells={selectedCells}
          availableCells={availableCells}
          wines={wines}
          boxId={parseInt(boxId)}
        />
      </div>
    )
  }
}

export default connect(state => ({
  ...state.cellar
}))(Remove)
