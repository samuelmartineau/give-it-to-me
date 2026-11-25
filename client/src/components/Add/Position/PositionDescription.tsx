import React from 'react';
import styled from 'styled-components';
import { TextField } from '@/components/Toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { updateModel, RootState } from '@/store/';

const Label = styled.label`
  display: block;
  margin: 20px 0 0;
  font-size: 1.1rem;
  font-weight: 700;

  & > input {
    margin-top: 6px;
    font-weight: 400;
  }
`;

type Props = PropsFromRedux;

export const PositionDescription = ({ onChange, model }: Props) => (
  <>
    <Label>
      Position dans la cave
      <TextField
        name="positionComment"
        required
        value={model.positionComment}
        placeholder="Dans les caisses à droite..."
        onChange={onChange}
      />
    </Label>
    <Label>
      Nombre de bouteilles
      <TextField
        name="count"
        value={model.count}
        type="number"
        placeholder="6"
        onChange={onChange}
      />
    </Label>
  </>
);

const connector = connect(
  (state: RootState) => ({
    model: state.adding.model,
  }),
  (dispatch) => ({
    onChange(evt) {
      const data = evt.currentTarget as
        | {
            name: 'positionComment';
            value: string;
          }
        | {
            name: 'count';
            value: number;
          };
      dispatch(updateModel(data));
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PositionDescriptionConnected = connector(PositionDescription);
