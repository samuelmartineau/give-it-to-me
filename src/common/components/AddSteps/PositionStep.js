import React, {Component, PropTypes} from 'react';

import CellarSchema from '../CellarSchema';
import CellsSelectors from '../CellsSelectors';

const PositionStep = (props) => {
    return (
        <div>
            <div> todo: Should be in cellar? If yes, give the position, else add a comment</div>
            <CellarSchema {...props} />
            <CellsSelectors {...props}/>
        </div>
    );
};

export default PositionStep;
