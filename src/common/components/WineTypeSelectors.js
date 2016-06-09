import React, {Component, PropTypes} from 'react';

import * as wineTypeStyle from '../styles/wineType';

const WineTypeSelector = ({onWineTypeChange, typeSelected, categorySelected, onWineCategoryChange}) => {

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
