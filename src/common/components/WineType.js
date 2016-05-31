import React, {Component, PropTypes} from 'react';
import tinycolor from 'tinycolor2';

import * as wineTypeStyle from '../styles/wineType';

const WineType = ({wineType, onWineTypeChange, typeSelected}) => {
    const computeStyle = {...wineTypeStyle.wineType};
    if (wineType.value === typeSelected) {
        computeStyle.background = wineType.color;
        computeStyle.borderColor = tinycolor(wineType.color).darken(5).toString();
    } else {
        computeStyle.background = tinycolor(wineType.color).setAlpha(.2);
        computeStyle.borderColor = tinycolor(wineType.color).darken(5).setAlpha(.2);
        computeStyle.color = 'grey';
    }

    return (
        <div style={computeStyle} onClick={onWineTypeChange.bind(null, wineType)}>
            <div style={wineTypeStyle.title}>
                <span style={wineTypeStyle.titleText}>{wineType.label}</span>
            </div>
            <div style={wineTypeStyle.wineTypeBefore}/>
        </div>
    );
};

WineType.propTypes = {
    wineType: PropTypes.object.isRequired,
    typeSelected: PropTypes.string.isRequired,
    onWineTypeChange: PropTypes.func.isRequired
}

export default WineType;