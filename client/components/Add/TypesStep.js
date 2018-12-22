// @flow

import React from 'react';
import { connect } from 'react-redux';
import config from '~/config';
const { WINE_TYPES_ALL, WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES_ALL } = config.bottleTypes;
import { updateModel } from '~/client/store/';
import { Radio } from '~/client/components/Toolkit';

type Props = {
  onTypeChange: Function
};

export class TypesStep extends React.Component<Props> {
  render() {
    return (
      <div>
        <legend>Famile</legend>
        {WINE_TYPES_ALL.map(wineType => (
          <Radio
            key={wineType.id}
            name="wineType"
            id={`add-type-${wineType.id}`}
            checked={wineType.id === this.props.model.wineType}
            onChange={this.props.onTypeChange}
            value={wineType.id}
          >
            {wineType.label}
          </Radio>
        ))}
        <legend>Type</legend>
        {WINE_TYPES[this.props.model.wineType].categories.map(wineCategory => (
          <Radio
            key={wineCategory}
            name="wineCategory"
            id={`add-type-${wineCategory}`}
            checked={wineCategory === this.props.model.wineCategory}
            onChange={this.props.onTypeChange}
            value={wineCategory}
          >
            {WINE_CATEGORIES[wineCategory].label}
          </Radio>
        ))}
        <legend>Taille de la bouteille</legend>
        {BOTTLE_TYPES_ALL.map(bottleType => (
          <Radio
            key={bottleType.id}
            name="bottleType"
            id={`add-type-${bottleType.id}`}
            checked={bottleType.id === this.props.model.bottleType}
            onChange={this.props.onTypeChange}
            value={bottleType.id}
          >
            {bottleType.label}
          </Radio>
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
