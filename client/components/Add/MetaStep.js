// @flow

import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AreaSuggestion } from '../Autocomplete/AreaSuggestion';
import { TextField } from '~/client/components/Toolkit';
import { updateModel } from '~/client/store/';

type Props = {
  onMetaChange: Function
};

class MetaStep extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <label>
          Domaine
          <TextField
            name="name"
            value={this.props.model.name}
            required
            placeholder="Domaine de ..."
            onChange={this.props.onMetaChange}
          />
        </label>
        <label>
          Année
          <TextField
            name="year"
            value={this.props.model.year}
            type="number"
            required
            placeholder="2014"
            onChange={this.props.onMetaChange}
          />
        </label>
        <label>
          Provenance
          <TextField
            name="source"
            value={this.props.model.source}
            type="text"
            placeholder="France"
            onChange={this.props.onMetaChange}
          />
        </label>

        <AreaSuggestion
          selected={this.props.model.area}
          onSuggestionSelected={this.props.onAreaChange}
          onClear={this.props.onAreaClear}
        />
      </React.Fragment>
    );
  }
}

export const MetaStepConnected = connect(
  state => ({ model: state.adding.model }),
  dispatch => ({
    onMetaChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateModel(name, value));
    },
    onAreaChange(evt, { suggestion }) {
      dispatch(updateModel('area', suggestion.original.id));
    },
    onAreaClear() {
      dispatch(updateModel('area', ''));
    }
  })
)(MetaStep);
