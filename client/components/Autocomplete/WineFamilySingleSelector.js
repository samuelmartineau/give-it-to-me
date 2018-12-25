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

type Props = {
  selectedFamily: any,
  onSuggestionSelected: Function,
  onClear: Function
};

class WineFamilySingleSelector extends React.Component<Props> {
  render() {
    const { selectedFamily, onClear, onSuggestionSelected } = this.props;

    return (
      <>
        {selectedFamily && (
          <div>
            <SelectedFamily>{selectedFamily.name}</SelectedFamily>
            <ButtonStyled type="button" primary onClick={onClear}>
              changer
            </ButtonStyled>
          </div>
        )}
        {!selectedFamily && (
          <WineFamilyFormater>
            {wineFamilies => (
              <WineFamilySuggestion
                onSuggestionSelected={onSuggestionSelected}
                wineFamilies={wineFamilies}
              />
            )}
          </WineFamilyFormater>
        )}
      </>
    );
  }
}

export default connect((state, { selected }) => ({
  selectedFamily: state.wineFamilies.map[selected]
}))(WineFamilySingleSelector);
