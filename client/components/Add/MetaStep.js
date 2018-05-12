import React from 'react';
import styled from 'styled-components';
import { AreaSuggestionField } from '../Autocomplete/AreaSuggestionField';
import { Text } from 'react-form';

const TextField = styled(Text)``;

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
    return <TextField {...props} value={this.state.model[props.name]} />;
  };

  render() {
    return (
      <React.Fragment>
        <p>Domaine</p>
        <label>
          <TextField field="name" required placeholder="Domaine de ..." />
        </label>
        <p>Année</p>
        <label>
          <TextField field="year" type="number" required placeholder="2014" />
        </label>
        <p>Provenance</p>
        <label>
          <TextField field="source" type="text" placeholder="France" />
        </label>

        <AreaSuggestionField field="area" />
      </React.Fragment>
    );
  }
}
