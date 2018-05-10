import React from 'react';
import styled from 'styled-components';
import AreaSuggestion from '../Autocomplete/AreaSuggestion';

const TextField = styled.input``;

class MetaStep extends React.Component {
  state = {
    model: {
      name: '',
      year: '',
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
    this.setState(({ model }) => ({ model: { ...model, [name]: value } }));
  };

  handleArea = (event, { suggestion }) => {
    this.setState(({ model }) => ({
      model: { ...model, area: suggestion.original.id }
    }));
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
          placeholder: 'Domaine de ...'
        })}

        {this.buildField({
          name: 'year',
          type: 'number',
          label: 'Année',
          required: true,
          placeholder: '2014'
        })}
        {this.buildField({
          name: 'source',
          type: 'text',
          label: 'Provenance',

          placeholder: 'France'
        })}
        <AreaSuggestion
          selected={this.state.model.area}
          onSuggestionSelected={this.handleArea}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default MetaStep;
