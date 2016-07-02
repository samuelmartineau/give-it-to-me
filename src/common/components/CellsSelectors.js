import React, {Component, PropTypes} from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'

import CellsSelector from './CellsSelector'
import * as cellSelectorStyle from '../styles/cellSelector'
import * as actions from '../actions'

export default class CellsSelectors extends Component {

  selectNextBox () {
    const {dispatch} = this.props
    dispatch(actions.selectNextBox())
  }

  render () {
    const {selectedCells} = this.props

    return (
      <div>
        <div style={cellSelectorStyle.cellSelectorAddButton}>
          <RaisedButton
            onClick={this.selectNextBox.bind(this)}
            label='Ajouter une caisse'
            labelPosition='after'
            primary
            icon={< ContentAdd />}/>
        </div>
        <div style={cellSelectorStyle.cellSelectorContainer}>
          {Object.keys(selectedCells).map((box, index) => {
            return <CellsSelector
              key={index}
              {...this.props}
              boxId={parseInt(box)}/>
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
