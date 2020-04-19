import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import WineFamilySingleSelector from '~/client/components/Autocomplete/WineFamilySingleSelector';
import { TextField } from '~/client/components/Toolkit';
import { AddWineFamilyButton } from './AddWineFamily/AddWineFamilyButton';
import { updateModel, RootState } from '~/client/store/';

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;
const Text = styled.span`
  font-style: italic;
`;
const FamilyContainer = styled.div`
  position: relative;
`;

type Props = PropsFromRedux;

const MetaStep: FC<Props> = ({
  model,
  onFamilyChange,
  onMetaChange,
  onFamilyClear,
}) => {
  return (
    <>
      <Label>
        <Text>Domaine</Text>
        <TextField
          name="name"
          value={model.name}
          required
          placeholder="Domaine de ..."
          onChange={onMetaChange}
        />
      </Label>
      <Label>
        <Text>Année</Text>
        <TextField
          name="year"
          value={model.year}
          type="number"
          required
          placeholder="2014"
          onChange={onMetaChange}
        />
      </Label>
      <Label>
        <Text>Provenance</Text>
        <TextField
          name="source"
          value={model.source}
          type="text"
          placeholder="France"
          onChange={onMetaChange}
        />
      </Label>

      <FamilyContainer>
        <Label>
          <Text>Appellation</Text>
          <WineFamilySingleSelector
            selected={model.wineFamily}
            onSuggestionSelected={onFamilyChange}
            onClear={onFamilyClear}
          />
        </Label>
        <AddWineFamilyButton />
      </FamilyContainer>
    </>
  );
};

const connector = connect(
  (state: RootState) => ({ model: state.adding.model }),
  (dispatch) => ({
    onMetaChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateModel(name, value));
    },
    onFamilyChange(evt, { suggestion }) {
      dispatch(updateModel('wineFamily', suggestion.original.id));
    },
    onFamilyClear() {
      dispatch(updateModel('wineFamily', ''));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PositionStepConnected = connector(MetaStep);
