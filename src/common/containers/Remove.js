import React, {Component} from 'react'
import {connect} from 'react-redux'

import CellsSelector from '../components/CellsSelector'
import CellarSchema from '../components/CellarSchema'
import WineCard from '../components/WineCard'

function findWineByPosition (wines, boxId, cellId) {
  return wines.find(wine => {
    if (wine.isInBoxes) {
      const bottleFound = wine.bottles.find(bottle => bottle.box === boxId && bottle.cell === cellId)
      return bottleFound
    }
    return false
  })
}

class Remove extends Component {

  constructor (props) {
    super(props)
    this.onSelectBox = this.onSelectBox.bind(this)
    const boxId = parseInt(Object.keys(props.bottlesByBoxes)[0])
    const selectableCells = props.bottlesByBoxes[boxId].map(item => item.cell)
    const cellId = selectableCells[0]
    this.state = {
      boxId: parseInt(boxId),
      selectableCells: selectableCells,
      cellId: cellId,
      wine: findWineByPosition(props.wines, boxId, cellId)
    }
  }

  onSelectCell = (boxId, cellId) => {
    const {bottlesByBoxes, wines} = this.props
    const selectableCells = bottlesByBoxes[boxId].map(item => item.cell)
    this.setState({
      boxId: boxId,
      selectableCells: selectableCells,
      cellId: cellId,
      wine: findWineByPosition(wines, boxId, cellId)
    })
  }

  onSelectBox = (evt, index, value) => {
    const {bottlesByBoxes} = this.props
    const selectableCells = bottlesByBoxes[value].map(item => item.cell)
    this.setState({
      boxId: value,
      selectableCells: selectableCells,
      selectedCell: selectableCells[0]
    })
  }

  render () {
    const {wines, bottlesByBoxes} = this.props
    const {wine, boxId, selectableCells, cellId} = this.state

    return (
      <div>
        <CellarSchema
          wines={wines}
          onSelectBox={(boxId) => {
            this.onSelectBox(null, null, boxId)
          }}
          isBoxClickable={(boxId) => {
            return Object.keys(bottlesByBoxes).map(id => parseInt(id)).indexOf(boxId) > -1
          }}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}}
          selectMode />
        <div style={{display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-around'}}>
          <CellsSelector
            selectableCells={selectableCells}
            selectedCells={[cellId]}
            bottlesByBoxes={bottlesByBoxes}
            selectableBoxes={Object.keys(bottlesByBoxes).map(id => parseInt(id))}
            isCellClickable={(cellId) => {
              return selectableCells.indexOf(cellId) > -1
            }}
            isCellDisabled={(cellId) => {
              return selectableCells.indexOf(cellId) === -1
            }}
            boxId={boxId}
            onSelectCell={this.onSelectCell.bind(this, boxId)}
            onSelectBox={this.onSelectBox}
          />
        </div>
        <WineCard
          {...this.props}
          wine={wine}
         />
      </div>
    )
  }
}

export default connect(state => ({
  ...state.cellar
}))(Remove)
