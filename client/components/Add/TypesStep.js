import React from 'react';

import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES, DEFAULT_TYPE } = config.bottleTypes;

const wineTypes = Object.keys(WINE_TYPES).map(key => ({
  id: key,
  ...WINE_TYPES[key]
}));
const bottleTypes = Object.keys(BOTTLE_TYPES).map(key => ({
  id: key,
  ...BOTTLE_TYPES[key]
}));
export class TypesStep extends React.Component {
  state = {
    wineTypeChecked: wineTypes[0].id,
    wineCategoryChecked: wineTypes[0].categories[0],
    bottleTypeChecked: DEFAULT_TYPE
  };
  handleChange = evt => {
    const { value } = evt.target;
    const newState = {
      ...this.state
    };
    if (evt.target.name === 'wineType') {
      newState.wineTypeChecked = value;
      newState.wineCategoryChecked = WINE_TYPES[value].categories[0];
    } else {
      newState[`${evt.target.name}Checked`] = value;
    }
    this.setState(newState);
  };

  render() {
    const {
      wineTypeChecked,
      wineCategoryChecked,
      bottleTypeChecked
    } = this.state;

    return (
      <div>
        <legend>Famile</legend>
        {wineTypes.map(wineType => (
          <label key={wineType.id}>
            <input
              type="radio"
              name="wineType"
              checked={wineType.id === wineTypeChecked}
              onChange={this.handleChange}
              value={wineType.id}
            />{' '}
            {wineType.label}
          </label>
        ))}
        <legend>Type</legend>
        {WINE_TYPES[wineTypeChecked].categories.map(wineCategory => (
          <label key={wineCategory}>
            <input
              type="radio"
              name="wineCategory"
              checked={wineCategory === wineCategoryChecked}
              onChange={this.handleChange}
              value={wineCategory}
            />{' '}
            {WINE_CATEGORIES[wineCategory].label}
          </label>
        ))}
        <legend>Taille de la bouteille</legend>
        {bottleTypes.map(bottleType => (
          <label key={bottleType.id}>
            <input
              type="radio"
              name="bottleType"
              checked={bottleType.id === bottleTypeChecked}
              onChange={this.handleChange}
              value={bottleType.id}
            />{' '}
            {bottleType.label}
          </label>
        ))}
      </div>
    );
  }
}
