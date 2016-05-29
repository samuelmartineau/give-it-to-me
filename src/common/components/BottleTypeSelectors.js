import React, {Component, PropTypes} from 'react';

import * as bottleTypeStyle from '../styles/bottleType';
import {BOTTLE_TYPES} from '../constants/BottleTypes';
import BottleType from './BottleType';

export default ({onBottleTypeChange, typeSelected}) => {
    const bottleTypes = Object.keys(BOTTLE_TYPES).map(key => {
        return {value: key, ...BOTTLE_TYPES[key]};
    });

    return (
        <div style={bottleTypeStyle.typeSelectorsContainer}>
            {bottleTypes.map((type, index) => <BottleType
                key={index}
                bottleType={type}
                onBottleTypeChange={onBottleTypeChange}
                typeSelected={typeSelected}/>)}
        </div>
    );
};
