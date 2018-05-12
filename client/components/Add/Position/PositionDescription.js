import React from 'react';
import styled from 'styled-components';

const TextField = styled.input``;

const PositionDescription = () => (
  <div>
    <TextField
      label="Position dans la cave"
      placeholder="Dans les caisses à droite..."
    />
    <TextField type="number" label="Nombre de bouteille" placeholder="6" />
  </div>
);

export default PositionDescription;
