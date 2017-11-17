import React from "react";
import TextField from "material-ui/TextField";

const PositionDescription = () => (
  <div>
    <TextField
      label="Position dans la cave"
      placeholder="Dans les caisses à droite..."
      fullWidth
      margin="normal"
    />
    <TextField
      type="number"
      label="Nombre de bouteille"
      placeholder="6"
      fullWidth
      margin="normal"
    />
  </div>
);

export default PositionDescription;
