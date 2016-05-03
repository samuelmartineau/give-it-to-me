import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {
    CELLAR_SCHEMA,
    BOX_COLOR,
    BOX_BORDER_SIZE,
    BOX_BORDER_COLOR,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from '../constants/Cellar';

export default class CellarSchema extends Component {

    selectBox() {
        debugger
    }

    render() {
      let svgContainer = ReactFauxDOM.createElement('svg');
      let boxId = 0;
      svgContainer.setAttribute('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

      CELLAR_SCHEMA.forEach(row => {
        row.forEach(box => {
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
    selectedCells: PropTypes.array.isRequired,
    selectableCells: PropTypes.array.isRequired
};
