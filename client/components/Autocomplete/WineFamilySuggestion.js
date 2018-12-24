// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AutoComplete } from './AutoComplete';
import { utils } from '~/config';
import { Button } from '~/client/components/Toolkit';

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;
const ButtonStyled = styled(Button)`
  margin: auto 1em;
`;
const SelectedFamily = styled.span`
  font-weight: bold;
`;
const Text = styled.span`
  font-style: italic;
`;

type Props = {
  wineFamilies: Array<{}>,
  selectedFamily: any,
  onSuggestionSelected: Function,
  onClear: Function
};

class WineFamilySuggestion extends React.Component<Props> {
  onSelect = (evt, ...args) => {
    const { onSuggestionSelected } = this.props;
    evt.preventDefault();
    onSuggestionSelected(evt, ...args);
  };

  render() {
    const { wineFamilies, selectedFamily, onClear } = this.props;

    const AreasFormated = wineFamilies.map(wineFamily => ({
      id: wineFamily.id,
      label: wineFamily.name,
      searchKey: utils.cleanString(wineFamily.name)
    }));

    return (
      <Label>
        <Text>AOC</Text>
        {selectedFamily && (
          <div>
            <SelectedFamily>{selectedFamily.name}</SelectedFamily>
            <ButtonStyled type="button" primary onClick={onClear}>
              changer
            </ButtonStyled>
          </div>
        )}
        {!selectedFamily && (
          <AutoComplete
            datas={AreasFormated}
            onSuggestionSelected={this.onSelect}
            placeholder="Commncer à taper le nom de l'AOC"
          />
        )}
      </Label>
    );
  }
}

export default connect((state, { selected }) => ({
  wineFamilies: state.wineFamilies.all,
  selectedFamily: state.wineFamilies.map[selected]
}))(WineFamilySuggestion);
