// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WineFamilySingleSelector from '~/client/components/Autocomplete/WineFamilySingleSelector';
import { TextField } from '~/client/components/Toolkit';
import { AddWineFamilyButton } from './AddWineFamily/AddWineFamilyButton';
import { updateModel } from '~/client/store/';
import type { WineType } from '~/client/components/Wine/Wine.type';

const Label = styled.label`
  display: block;
  margin: 1em auto;
  position: relative;
`;
const Text = styled.span`
  font-style: italic;
`;

type Props = {
  onMetaChange: Function,
  onFamilyChange: Function,
  onFamilyClear: Function,
  model: WineType
};

class MetaStep extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Label>
          <Text>Domaine</Text>
          <TextField
            name="name"
            value={this.props.model.name}
            required
            placeholder="Domaine de ..."
            onChange={this.props.onMetaChange}
          />
        </Label>
        <Label>
          <Text>Année</Text>
          <TextField
            name="year"
            value={this.props.model.year}
            type="number"
            required
            placeholder="2014"
            onChange={this.props.onMetaChange}
          />
        </Label>
        <Label>
          <Text>Provenance</Text>
          <TextField
            name="source"
            value={this.props.model.source}
            type="text"
            placeholder="France"
            onChange={this.props.onMetaChange}
          />
        </Label>

        <Label>
          <Text>
            Appellation <AddWineFamilyButton />
          </Text>
          <WineFamilySingleSelector
            selected={this.props.model.wineFamily}
            onSuggestionSelected={this.props.onFamilyChange}
            onClear={this.props.onFamilyClear}
          />
        </Label>
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
    onFamilyChange(evt, { suggestion }) {
      dispatch(updateModel('wineFamily', suggestion.original.id));
    },
    onFamilyClear() {
      dispatch(updateModel('wineFamily', ''));
    }
  })
)(MetaStep);
