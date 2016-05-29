import React, {Component, PropTypes} from 'react';

import WineType from './WineType';
import WineCategory from './WineCategory';
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes';
import * as wineTypeStyle from '../styles/wineType';

const WineTypeSelector = ({onWineTypeChange, typeSelected, categorySelected, onWineCategoryChange}) => {
    const types = Object.keys(WINE_TYPES).map(type => {
        return {...WINE_TYPES[type], ...{value: type}};
    });
    const categories = WINE_TYPES[typeSelected].categories.map(category => {
        return {value: category, ...WINE_CATEGORIES[category]};
    });

    return (
        <div>
            <div style={wineTypeStyle.typeSelectorsContainer}>
                {types.map((type, index) => <WineType key={index} wineType={type} onWineTypeChange={onWineTypeChange} typeSelected={typeSelected}/>)}
            </div>

            <div style={wineTypeStyle.typeSelectorsContainer}>
                {categories.map((category, index) => <WineCategory key={index} wineCategory={category} onWineCategoryChange={onWineCategoryChange} categorySelected={categorySelected}/>)}
            </div>
        </div>
    );
}

WineTypeSelector.propTypes = {
  typeSelected: PropTypes.string.isRequired,
  categorySelected: PropTypes.string.isRequired,
  onWineTypeChange: PropTypes.func.isRequired,
  onWineCategoryChange: PropTypes.func.isRequired
}

export default WineTypeSelector;
