import React, {
  PropTypes
} from 'react'
import {select} from 'd3'
import ReactFauxDOM from 'react-faux-dom'

import {
  drawBottle,
  CELLAR_SCHEMA,
  CELL_SIZE,
  BOX_BORDER_COLOR,
  CELL_BORDER_SIZE,
  BOX_COLOR,
  FULL_BOX_WIDTH_CELLS
} from '../constants/Cellar'

const BoxSchema = ({
  selectableIds,
  onSelectCell,
  bottlesToDraw,
  boxId,
  isCellClickable,
  isCellDisabled
}) => {
  const box = CELLAR_SCHEMA[boxId]

  const canvasWidth = box.schema[0] * CELL_SIZE
  const canvasHeigh = box.schema[1] * CELL_SIZE
  let svgContainer = ReactFauxDOM.createElement('svg')
  svgContainer.style.setProperty('width', '100%')
  svgContainer.style.setProperty('height', '100%')
  let cellId = 0

  svgContainer.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeigh}`)
  svgContainer.setAttribute('width', FULL_BOX_WIDTH_CELLS * CELL_SIZE)
  svgContainer.setAttribute('height', canvasHeigh)

  Array(box.schema[0]).fill()
    .forEach((_, xIndex) => {
      Array(box.schema[1]).fill()
        .forEach((_, yIndex) => {
          const cursor = isCellDisabled(cellId) ? 'not-allowed' : 'pointer'
          const box = select(svgContainer).append('rect')

          box.attr('x', xIndex * CELL_SIZE)
            .attr('y', yIndex * CELL_SIZE)
            .attr('width', CELL_SIZE)
            .attr('height', CELL_SIZE)
            .attr('stroke-width', CELL_BORDER_SIZE)
            .attr('style', `cursor: ${cursor}`)
            .attr('stroke', BOX_BORDER_COLOR)
            .attr('fill', BOX_COLOR)

          if (isCellClickable(cellId)) {
            box.on('click', onSelectCell.bind(null, cellId))
          }
          cellId++
        })
    })

  bottlesToDraw.forEach(bottle => {
    drawBottle(svgContainer, bottle.color, bottle.box, bottle.cell, bottle.isBoxSchema, bottle.blink)
  })

  return (
    <div > {
      svgContainer.toReact()
    } </div>
  )
}

BoxSchema.propTypes = {
  boxId: PropTypes.number.isRequired,
  bottlesToDraw: PropTypes.array.isRequired,
  selectableCells: PropTypes.array.isRequired,
  onSelectCell: PropTypes.func.isRequired,
  isCellClickable: PropTypes.func.isRequired,
  isCellDisabled: PropTypes.func.isRequired
}

export default BoxSchema
