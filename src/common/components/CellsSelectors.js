import React, {Component, PropTypes} from 'react';

import CellsSelector from './CellsSelector';

export default class CellsSelectors extends Component {

    render() {
        const {selectedCells, selectableCells} = this.props;

        return (
          <div>
            {
                Object.keys(selectedCells).map((box, index) => {
                     return <CellsSelector key={index} {...this.props} boxId={parseInt(box)} />
                  })
              }
          </div>
        );
    }
}

CellsSelectors.propTypes = {
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};
