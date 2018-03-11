import React from 'react';
import TextField from 'material-ui/TextField';
import AreaSuggestion from '../Autocomplete/AreaSuggestion';

class MetaStep extends React.Component {
  state = {
    model: {
      name: '',
      year: null,
      source: '',
      area: ''
    }
  };

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  handleField = evt => {
    const { value, name } = evt.target;
    this.setState(() => ({ model: { [name]: value } }));
  };

  handleArea = (event, { suggestion }) => {
    this.setState(() => ({ model: { area: suggestion.original.id } }));
  };

  submit() {
    console.log('model', this);
  }

  buildField = props => {
    return (
      <TextField
        {...props}
        onChange={this.handleField}
        value={this.state.model[props.name]}
        fullWidth
        margin="normal"
      />
    );
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        {this.buildField({
          name: 'name',
          label: 'Nom',
          required: true,
          inputProps: { required: true },
          placeholder: 'Domaine de ...'
        })}

        <TextField
          model={this.state.model}
          name="year"
          type="number"
          label="Année"
          required
          inputProps={{ required: true }}
          placeholder="2014"
          fullWidth
          margin="normal"
        />
        <TextField
          name="source"
          type="text"
          label="Provenance"
          placeholder="France"
          fullWidth
          margin="normal"
        />
        <AreaSuggestion
          selected={[this.state.model.area]}
          onSuggestionSelected={this.handleArea}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default MetaStep;
