// @flow

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';
const { WINE_TYPES_ALL, WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES_ALL } = config.bottleTypes;
import { updateModel } from '~/client/store/';
import { Radio } from '~/client/components/Toolkit';

type Props = {
  onTypeChange: Function,
  model: {}
};

const Text = styled.span`
  font-style: italic;
  display: block;
`;

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;
const RadioStyled = styled(Radio)`
  margin: 0.5em;
`;

export class TypesStep extends React.Component<Props> {
  render() {
    const { model, onTypeChange } = this.props;
    return (
      <>
        <Label>
          <Text>Famile</Text>
          {WINE_TYPES_ALL.map(wineType => (
            <RadioStyled
              key={wineType.id}
              name="wineType"
              id={`add-type-${wineType.id}`}
              checked={wineType.id === model.wineType}
              onChange={onTypeChange}
              value={wineType.id}
            >
              {wineType.label}
            </RadioStyled>
          ))}
        </Label>
        <Label>
          <Text>Type</Text>
          {WINE_TYPES[model.wineType].categories.map(wineCategory => (
            <RadioStyled
              key={wineCategory}
              name="wineCategory"
              id={`add-type-${wineCategory}`}
              checked={wineCategory === model.wineCategory}
              onChange={onTypeChange}
              value={wineCategory}
            >
              {WINE_CATEGORIES[wineCategory].label}
            </RadioStyled>
          ))}
        </Label>
        <Label>
          <Text>Taille de la bouteille</Text>
          {BOTTLE_TYPES_ALL.map(bottleType => (
            <RadioStyled
              key={bottleType.id}
              name="bottleType"
              id={`add-type-${bottleType.id}`}
              checked={bottleType.id === model.bottleType}
              onChange={onTypeChange}
              value={bottleType.id}
            >
              {bottleType.label}
            </RadioStyled>
          ))}
        </Label>
      </>
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
