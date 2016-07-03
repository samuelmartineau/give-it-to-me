import React, {Component, PropTypes} from 'react'
import {select} from 'd3'
import ReactFauxDOM from 'react-faux-dom'

import {
  CELLAR_SCHEMA,
  BOX_COLOR,
  BOX_BORDER_SIZE,
  BOX_BORDER_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SELECTED_COLOR,
  drawBottle
} from '../constants/Cellar'
import {WINE_TYPES} from '../constants/WineTypes'
import * as actions from '../actions'

export default class CellarSchema extends Component {

  selectBox (boxId) {
    const {dispatch, selectedCells} = this.props
    const isBoxAlreadySelected = selectedCells[boxId]
    if (isBoxAlreadySelected && Object.keys(selectedCells).length > 1) {
      dispatch(actions.unselectBox(boxId))
    } else {
      dispatch(actions.selectBox(boxId))
    }
  }

  render () {
    const {
      wine,
      wines,
      selectedCells,
      availableCells,
      viewMode
    } = this.props
    let svgContainer = ReactFauxDOM.createElement('svg')
    let boxId = 0
    svgContainer.setAttribute('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`)

    CELLAR_SCHEMA.forEach(box => {
      const moreThanOneBoxSeltected = Object.keys(selectedCells).length > 1
      const notAlreadySelected = !selectedCells[boxId]
      const isBoxClickable = availableCells[boxId] && (moreThanOneBoxSeltected || notAlreadySelected)
      const cursor = isBoxClickable
        ? 'pointer'
        : 'not-allowed'
      let svgBox = select(svgContainer).append('rect')

      svgBox.attr('x', box.x).attr('y', box.y).attr('width', box.width).attr('height', box.height).attr('stroke-width', BOX_BORDER_SIZE).attr('style', `cursor: ${cursor}`).attr('stroke', BOX_BORDER_COLOR).attr('fill', BOX_COLOR)

      if (!viewMode && isBoxClickable) {
        svgBox.on('click', this.selectBox.bind(this, boxId))
      }

      if (viewMode && wine.bottles.map(bottle => bottle.box).indexOf(boxId) === -1) {
        svgBox.attr('style', 'opacity: 0.3')
      }

      boxId++
    })

    wines.forEach(wine => {
      if (wine.bottles) {
        wine.bottles.forEach(bottle => {
          drawBottle(svgContainer, WINE_TYPES[wine.wineType].color, bottle.box, bottle.cell, false, viewMode)
        })
      }
    })

    Object.keys(selectedCells).forEach(box => {
      selectedCells[box].forEach(cell => {
        drawBottle(svgContainer, SELECTED_COLOR, box, cell, false, viewMode)
      })
    })
    return (
      <div>
        {svgContainer.toReact()}
      </div>
    )
  }
}

CellarSchema.propTypes = {
  wines: PropTypes.array.isRequired,
  selectedCells: PropTypes.object.isRequired,
  availableCells: PropTypes.object.isRequired
}
