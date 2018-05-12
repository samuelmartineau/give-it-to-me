import React from 'react';
import styled from 'styled-components';
import AreaSuggestion from '../Autocomplete/AreaSuggestion';

const TextField = styled.input``;

export class MetaStep extends React.Component {
  state = {
    model: {
      name: '',
      year: '',
      source: '',
      area: ''
    }
  };

  handleField = evt => {
    const { value, name } = evt.target;
    this.setState(({ model }) => ({ model: { ...model, [name]: value } }));
  };

  handleArea = (event, { suggestion }) => {
    this.setState(({ model }) => ({
      model: { ...model, area: suggestion.original.id }
    }));
  };

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
