import React, {Component, PropTypes} from 'react';
import tinycolor from 'tinycolor2';

import * as wineTypeStyle from '../styles/wineType';

const wineCategory = ({wineCategory, onWineCategoryChange, categorySelected}) => {
    const computeStyle = {...wineTypeStyle.wineCategory};
    const computeStyleImage = {...wineTypeStyle.wineCategoryImage};
    computeStyleImage.backgroundImage = `url('${wineCategory.image}')`;
    if (wineCategory.value === categorySelected) {
        computeStyleImage.opacity = 1;
    } else {
        computeStyleImage.opacity = 0.3;
        computeStyle.color = 'grey';
    }

    return (
        <div style={computeStyle} onClick={onWineCategoryChange.bind(null, wineCategory)}>
            <div style={wineTypeStyle.title}>
                <span style={wineTypeStyle.titleText}>{wineCategory.label}</span>
            </div>
            <div style={computeStyleImage} />
            <div style={wineTypeStyle.wineCategoryBefore}/>
        </div>
    );
};

wineCategory.propTypes = {
    wineCategory: PropTypes.object.isRequired,
    categorySelected: PropTypes.string.isRequired,
    onWineCategoryChange: PropTypes.func.isRequired
}

export default wineCategory;
