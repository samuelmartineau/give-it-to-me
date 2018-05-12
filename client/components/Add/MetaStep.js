// @flow

import * as React from 'react';
import styled from 'styled-components';
import { AreaSuggestion } from '../Autocomplete/AreaSuggestion';
import { TextField } from '~/client/components/Toolkit';

type Props = {
  onMetaChange: Function
};

export class MetaStep extends React.Component<Props> {
  handleField = (evt: SyntheticEvent) => {
    const { value, name } = evt.target;
    this.props.onMetaChange(name, value);
  };

  handleArea = (event, { suggestion }) => {
    this.props.onMetaChange('area', suggestion.original.id);
  };

  render() {
    return (
      <React.Fragment>
        <p>Domaine</p>
        <label>
          <TextField
            name="name"
            required
            placeholder="Domaine de ..."
            onChange={this.handleField}
          />
        </label>
        <p>Année</p>
        <label>
          <TextField
            name="year"
            type="number"
            required
            placeholder="2014"
            onChange={this.handleField}
          />
        </label>
        <p>Provenance</p>
        <label>
          <TextField
            name="source"
            type="text"
            placeholder="France"
            onChange={this.handleField}
          />
        </label>

        <AreaSuggestion onSuggestionSelected={this.handleArea} />
      </React.Fragment>
    );
  }
}
