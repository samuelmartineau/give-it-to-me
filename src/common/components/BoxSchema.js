import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {SELECTED_COLOR, drawBottle, CELLAR_SCHEMA, CELL_SIZE, BOX_BORDER_COLOR, CELL_BORDER_SIZE, BOX_COLOR, FULL_BOX_WIDTH_CELLS} from '../constants/Cellar';
import {WINE_TYPES} from '../constants/WineTypes';

export default class BoxSchema extends Component {

    selectCell(cellId) {
        debugger
    }

    render() {
        const {wines, selectedCells, boxId, bottlesByBoxes} = this.props;
        const box = CELLAR_SCHEMA[boxId];
        const bottles = bottlesByBoxes[boxId] || [];
        const canvasWidth = box.schema[0] * CELL_SIZE;
        const canvasHeigh = box.schema[1] * CELL_SIZE;
        let svgContainer = ReactFauxDOM.createElement('svg');
        svgContainer.style.setProperty('width', '100%');
        svgContainer.style.setProperty('height', '100%');
        let cellId = 0;

        svgContainer.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeigh}`);
        svgContainer.setAttribute('width', FULL_BOX_WIDTH_CELLS * CELL_SIZE);
        svgContainer.setAttribute('height', canvasHeigh);

        Array(box.schema[0]).fill()
            .forEach((_, xIndex) => {
                Array(box.schema[1]).fill()
                    .forEach((_, yIndex) => {
                      d3.select(svgContainer)
                          .append('rect')
                          .attr('x', xIndex * CELL_SIZE)
                          .attr('y', yIndex * CELL_SIZE)
                          .attr('width', CELL_SIZE)
                          .attr('height', CELL_SIZE)
                          .attr('stroke-width', CELL_BORDER_SIZE)
                          .attr('stroke', BOX_BORDER_COLOR)
                          .attr('fill', BOX_COLOR)
                          .on('click', this.selectCell.bind(this, cellId));
                      cellId++;
                    });
            });


        bottles.forEach(bottle => {
            drawBottle(svgContainer, WINE_TYPES[bottle.type].color, boxId, bottle.cell, true);
        });

        selectedCells[boxId].forEach(cell => {
            drawBottle(svgContainer, SELECTED_COLOR, boxId, cell, true);
        });

        return (
          <div>
            {svgContainer.toReact()}
          </div>
        );
    }
}

BoxSchema.propTypes = {
    boxId: PropTypes.number.isRequired,
    bottlesByBoxes: PropTypes.object.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};