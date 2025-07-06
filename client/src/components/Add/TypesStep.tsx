import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { BOTTLE_TYPES } = config.bottleTypes;
import { updateModel, RootState } from '@/store/';
import { Radio } from '@/components/Toolkit';
import { WINE_TYPES_ALL, BOTTLE_TYPES_ALL } from '@/helpers';

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

type Props = PropsFromRedux;

const TypesStep: FC<Props> = ({ model, onTypeChange }) => {
  return (
    <>
      <Label>
        <Text>Famile</Text>
        {WINE_TYPES_ALL.map((wineType) => (
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
        {WINE_TYPES[model.wineType].categories.map((wineCategory) => (
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
        {BOTTLE_TYPES_ALL.map((bottleType) => (
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
};

const connector = connect(
  (state: RootState) => ({ model: state.adding.model }),
  (dispatch) => ({
    onTypeChange(evt: React.FormEvent<HTMLInputElement>) {
      const data = evt.currentTarget as
        | {
            value: keyof typeof WINE_TYPES;
            name: 'wineType';
          }
        | {
            value: keyof typeof WINE_CATEGORIES;
            name: 'wineCategory';
          }
        | {
            value: keyof typeof BOTTLE_TYPES;
            name: 'bottleType';
          };
      dispatch(updateModel(data));
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const TypesStepConnected = connector(TypesStep);
