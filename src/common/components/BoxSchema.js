import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {SELECTED_COLOR, drawBottle, CELLAR_SCHEMA, CELL_SIZE, BOX_BORDER_COLOR, CELL_BORDER_SIZE, BOX_COLOR, FULL_BOX_WIDTH_CELLS} from '../constants/Cellar';
import {WINE_TYPES} from '../constants/WineTypes';
import * as actions from '../actions';

export default class BoxSchema extends Component {

    selectCell(cellId) {
        const {selectableCells, dispatch, selectedCells, boxId} = this.props;
        const isCellAlreadySelected = selectedCells[boxId].indexOf(cellId) > -1;
        if (isCellAlreadySelected) {
            dispatch(actions.unselectCell(boxId, cellId));
        } else {
            dispatch(actions.selectCell(boxId, cellId));
        }
    }

    render() {
        const {wines, selectedCells, boxId, bottlesByBoxes, availableCells} = this.props;
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
                        const isCellAvailable = availableCells[boxId].indexOf(cellId) > -1;
                        const moreThanOneCellSeltected = selectedCells[boxId].length > 1;
                        const notAlreadySelected = selectedCells[boxId].indexOf(cellId) === -1;
                        const isCellClickable = isCellAvailable && (moreThanOneCellSeltected || notAlreadySelected);
                        const cursor = isCellClickable ? 'pointer' : 'not-allowed';
                        const box = d3.select(svgContainer).append('rect');

                        box.attr('x', xIndex * CELL_SIZE)
                            .attr('y', yIndex * CELL_SIZE)
                            .attr('width', CELL_SIZE)
                            .attr('height', CELL_SIZE)
                            .attr('stroke-width', CELL_BORDER_SIZE)
                            .attr('style', `cursor: ${cursor}`)
                            .attr('stroke', BOX_BORDER_COLOR)
                            .attr('fill', BOX_COLOR)

                        if (isCellClickable) {
                            box.on('click', this.selectCell.bind(this, cellId));
                        }
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
    availableCells: PropTypes.object.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};
