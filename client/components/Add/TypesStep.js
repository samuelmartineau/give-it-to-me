import React from 'react';
import { connect } from 'react-redux';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
import { wineTypes, bottleTypes } from './types/defaultTypes';
import { updateModel } from '~/client/store/';

export class TypesStep extends React.Component {
  render() {
    return (
      <div>
        <legend>Famile</legend>
        {wineTypes.map(wineType => (
          <label key={wineType.id}>
            <input
              type="radio"
              name="wineType"
              checked={wineType.id === this.props.model.wineType}
              onChange={this.props.onTypeChange}
              value={wineType.id}
            />{' '}
            {wineType.label}
          </label>
        ))}
        <legend>Type</legend>
        {WINE_TYPES[this.props.model.wineType].categories.map(wineCategory => (
          <label key={wineCategory}>
            <input
              type="radio"
              name="wineCategory"
              checked={wineCategory === this.props.model.wineCategory}
              onChange={this.props.onTypeChange}
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
              onChange={this.props.onTypeChange}
              checked={bottleType.id === this.props.model.bottleType}
              value={bottleType.id}
            />{' '}
            {bottleType.label}
          </label>
        ))}
      </div>
    );
  }
}

export const TypesStepConnected = connect(
  state => ({ model: state.adding.model }),
  dispatch => ({
    onTypeChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateModel(name, value));
    }
  })
)(TypesStep);
