import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {
    CELLAR_SCHEMA,
    BOX_COLOR,
    BOX_BORDER_SIZE,
    BOX_BORDER_COLOR,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SELECTED_COLOR,
    getBottleInfos
} from '../constants/Cellar';
import {WINE_TYPES} from '../constants/WineTypes';
import * as actions from '../actions';

function drawBottle(svgElement, color, box, cell) {
    const bottleInfos = getBottleInfos(box, cell);
    d3.select(svgElement)
        .append('circle')
        .attr('pointer-events', 'none')
        .attr('cx', bottleInfos.cx)
        .attr('cy', bottleInfos.cy)
        .attr('r', bottleInfos.radius)
        .attr('fill', color)
}

export default class CellarSchema extends Component {

    selectBox(boxId) {
        const {selectableCells, dispatch, selectedCells} = this.props;
        const isBoxSelectable = selectableCells[boxId];
        const isBoxAlreadySelected = selectedCells[boxId];
        if (!isBoxSelectable) {
            return;
        } else if (isBoxAlreadySelected && Object.keys(selectedCells).length > 1) {
            dispatch(actions.unselectBox(boxId));
        } else {
            dispatch(actions.selectBox(boxId));
        }

    }

    render() {
        const {wines, selectedCells} = this.props;
        let svgContainer = ReactFauxDOM.createElement('svg');
        let boxId = 0;
        svgContainer.setAttribute('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

        CELLAR_SCHEMA.forEach(box => {
          d3.select(svgContainer)
              .append('rect')
              .attr('x', box.x)
              .attr('y', box.y)
              .attr('width', box.width)
              .attr('height', box.height)
              .attr('stroke-width', BOX_BORDER_SIZE)
              .attr('stroke', BOX_BORDER_COLOR)
              .attr('fill', BOX_COLOR)
              .on('click', this.selectBox.bind(this, boxId));
          boxId++;
        });

        wines.forEach(wine => {
            wine.bottles.forEach(bottle => {
                drawBottle(svgContainer, WINE_TYPES[wine.type].color, bottle.box, bottle.cell);
            });
        });

        Object.keys(selectedCells).forEach(box => {
            selectedCells[box].forEach(cell => {
                drawBottle(svgContainer, SELECTED_COLOR, box, cell);
            });
        });
        return (
          <div>
            {svgContainer.toReact()}
          </div>
        );
    }
}

CellarSchema.propTypes = {
    wines: PropTypes.array.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};
