import React, {Component, PropTypes} from 'react';

import CellarSchema from '../CellarSchema';
import CellsSelectors from '../CellsSelectors';

const PositionStep = (props) => {
    return (
        <div>
          <CellarSchema {...props} />
          <CellsSelectors {...props}/>
        </div>
    );
};

export default PositionStep;
