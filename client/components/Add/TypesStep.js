import React from 'react';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
import {
  wineTypes,
  bottleTypes,
  defaultSelectedTypes
} from './types/defaultTypes';

export class TypesStep extends React.Component {
  state = defaultSelectedTypes;
  handleChange = evt => {
    const { value, name } = evt.target;
    const newState = { ...this.state };
    if (name === 'wineType') {
      newState.wineType = value;
      newState.wineCategory = WINE_TYPES[value].categories[0];
    } else {
      newState[name] = value;
    }
    this.props.onTypeChange(newState);
    this.setState(newState);
  };

  render() {
    const {
      wineType: wineTypeChecked,
      wineCategory: wineCategoryChecked
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
