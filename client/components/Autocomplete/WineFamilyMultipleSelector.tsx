

import React from 'react';
import { WineFamilySuggestion } from './WineFamilySuggestion';
import WineFamilyFormater from './WineFamilyFormater';

type Props = {|
  selectedFamilyIds: Array<any>,
  onSuggestionSelected: Function
|};

class WineFamilyMultipleSelector extends React.Component<Props> {
  render() {
    const { selectedFamilyIds, onSuggestionSelected } = this.props;
    return (
      <>
        <WineFamilyFormater>
          {wineFamilies => {
            const excluded = wineFamilies.filter(
              item => !selectedFamilyIds.includes(item.id)
            );
            return (
              <WineFamilySuggestion
                onSuggestionSelected={onSuggestionSelected}
                wineFamilies={excluded}
              />
            );
          }}
        </WineFamilyFormater>
      </>
    );
  }
}
export default WineFamilyMultipleSelector;
