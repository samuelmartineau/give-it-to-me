import React from 'react';
import { TextField } from '~/client/components/Toolkit';
import { connect } from 'react-redux';
import { updateModel } from '~/client/store/';

type Props = {
  onChange: Function,
  model: {}
};

export const PositionDescription = ({ onChange, model }: Props) => (
  <div>
    <label>
      Position dans la cave
      <TextField
        name="positionComment"
        required
        value={model.positionComment}
        placeholder="Dans les caisses à droite..."
        onChange={onChange}
      />
    </label>
    <label>
      Nombre de bouteille
      <TextField
        name="count"
        value={model.count}
        type="number"
        placeholder="6"
        onChange={onChange}
      />
    </label>
  </div>
);

export const PositionDescriptionConnected = connect(
  state => ({ model: state.adding.model }),
  dispatch => ({
    onChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateModel(name, value));
    }
  })
)(PositionDescription);
