import React from 'react';
import styled from 'styled-components';

const TextField = styled.input``;

function bindValue(callback) {
  return evt => {
    const { value, name } = evt.target;
    callback(name, value);
  };
}

export const PositionDescription = ({ onChange }) => (
  <div>
    <label>
      Position dans la cave
      <TextField
        name="positionComment"
        placeholder="Dans les caisses à droite..."
        onChange={bindValue(onChange)}
      />
    </label>
    <label>
      Nombre de bouteille
      <TextField
        name="count"
        type="number"
        placeholder="6"
        onChange={bindValue(onChange)}
      />
    </label>
  </div>
);
