import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import WineFamilySingleSelector from '@/components/Autocomplete/WineFamilySingleSelector';
import { TextField } from '@/components/Toolkit';
import { AddWineFamilyButton } from './AddWineFamily/AddWineFamilyButton';
import { updateModel, RootState } from '@/store/';
import { FilterResult } from 'fuzzy';
import { SearchableWineFamily } from '../Autocomplete/WineFamilySuggestion';

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
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const data = evt.currentTarget as
      | {
          name: 'name';
          value: string;
        }
      | {
          name: 'year';
          value: number;
        }
      | {
          name: 'source';
          value: string;
        };
    onMetaChange(data);
  };

  return (
    <>
      <Label>
        <Text>Domaine</Text>
        <TextField
          name="name"
          value={model.name}
          required
          placeholder="Domaine de ..."
          onChange={onChange}
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
          onChange={onChange}
        />
      </Label>
      <Label>
        <Text>Provenance</Text>
        <TextField
          name="source"
          value={model.source}
          type="text"
          placeholder="France"
          onChange={onChange}
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
    onMetaChange(
      data:
        | {
            name: 'name';
            value: string;
          }
        | {
            name: 'year';
            value: number;
          }
        | {
            name: 'source';
            value: string;
          },
    ) {
      dispatch(updateModel(data));
    },
    onFamilyChange(evt: Event, data: FilterResult<SearchableWineFamily>) {
      dispatch(updateModel({ name: 'wineFamily', value: data.original.id }));
    },
    onFamilyClear() {
      dispatch(updateModel({ name: 'wineFamily', value: undefined }));
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const MetaStepConnected = connector(MetaStep);
