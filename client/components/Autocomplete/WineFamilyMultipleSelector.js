// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { WineFamilySuggestion } from './WineFamilySuggestion';
import WineFamilyFormater from './WineFamilyFormater';
import { Button } from '~/client/components/Toolkit';

const ButtonStyled = styled(Button)`
  margin: auto 1em;
`;
const SelectedFamily = styled.span`
  font-weight: bold;
`;

type Props = {|
  selectedFamilies: Array<any>,
  onSuggestionSelected: Function
|};

class WineFamilyMultipleSelector extends React.Component<Props> {
  render() {
    const { selectedFamilies, onSuggestionSelected } = this.props;
    console.log(selectedFamilies);
    return (
      <>
        <WineFamilyFormater>
          {wineFamilies => (
            <WineFamilySuggestion
              onSuggestionSelected={onSuggestionSelected}
              wineFamilies={wineFamilies}
            />
          )}
        </WineFamilyFormater>
      </>
    );
  }
}

export default connect((state, { selectedFamilyIds }) => ({
  selectedFamilies: selectedFamilyIds.map(id => state.wineFamilies.map[id])
}))(WineFamilyMultipleSelector);
