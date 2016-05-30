import React, {Component, PropTypes} from 'react';

import WineTypeSelectors from '../WineTypeSelectors';
import BottleTypeSelectors from '../BottleTypeSelectors';

const TypesStep = ({handleWineType, handleWineCategory, handleBottleType, wineType, wineCategory, bottleType}) => {
    return (
        <div>
            <WineTypeSelectors
                onWineTypeChange={handleWineType}
                onWineCategoryChange={handleWineCategory}
                typeSelected={wineType}
                categorySelected={wineCategory}/>
            <BottleTypeSelectors
                onBottleTypeChange={handleBottleType}
                typeSelected={bottleType}
            />
        </div>
    );
};

export default TypesStep;
