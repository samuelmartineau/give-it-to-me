import React from "react";
import TextField from "material-ui/TextField";
import AreaSuggestion from "../Autocomplete/AreaSuggestion";

const MetaStep = () => {
  return (
    <div>
      <TextField
        label="Nom"
        placeholder="Domaine de ..."
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Année"
        placeholder="2014"
        fullWidth
        margin="normal"
      />
      <TextField
        type="text"
        label="Provenance"
        placeholder="France"
        fullWidth
        margin="normal"
      />
      <AreaSuggestion onSuggestionSelected={console.log} />
    </div>
  );
};

export default MetaStep;
