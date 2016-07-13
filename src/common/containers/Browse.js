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

function getBrowseState (wines, bottlesByBoxes, boxId, cellId) {
  let state = {
    cellId: cellId,
    boxId: boxId
  }

  if (typeof boxId === 'undefined') {
    state.boxId = parseInt(Object.keys(bottlesByBoxes)[0])
  }
  state.selectableCells = bottlesByBoxes[state.boxId].map(item => item.cell)
  if (typeof cellId === 'undefined') {
    state.cellId = state.selectableCells[0]
  }
  state.wine = findWineByPosition(wines, state.boxId, state.cellId)

  return state
}

class Browse extends Component {

  constructor (props) {
    super(props)
    this.onSelectBox = this.onSelectBox.bind(this)
    const {wines, bottlesByBoxes} = this.props
    this.state = getBrowseState(wines, bottlesByBoxes)
  }

  componentWillReceiveProps (nextProps) {
    const {boxId, cellId, wine} = this.state
    const {wines, bottlesByBoxes} = nextProps
    const isBottleSelectedRemoved = !findWineByPosition(wines, boxId, cellId)
    const oldWineUpdated = nextProps.wines.find(w => w.id === wine.id)

    if (isBottleSelectedRemoved && oldWineUpdated) {
      const firstBottle = oldWineUpdated.bottles[0]
      this.setState(getBrowseState(wines, bottlesByBoxes, firstBottle.box, firstBottle.cell))
    } else if (isBottleSelectedRemoved) {
      this.setState(getBrowseState(wines, bottlesByBoxes))
    } else {
      this.setState({
        wine: oldWineUpdated
      })
    }
  }

  onSelectCell = (boxId, cellId) => {
    const {bottlesByBoxes, wines} = this.props
    this.setState(getBrowseState(wines, bottlesByBoxes, boxId, cellId))
  }

  onSelectBox = (evt, index, boxId) => {
    const {bottlesByBoxes, wines} = this.props
    this.setState(getBrowseState(wines, bottlesByBoxes, boxId))
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
          selectedCells={{[boxId]: [cellId]}}
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
          <WineCard
            {...this.props}
            wine={wine}
           />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  ...state.cellar
}))(Browse)
