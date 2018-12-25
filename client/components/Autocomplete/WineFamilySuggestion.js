// @flow

import React from 'react';
import { AutoComplete } from './AutoComplete';

type Props = {
  wineFamilies: Array<{}>,
  onSuggestionSelected: Function
};

export class WineFamilySuggestion extends React.Component<Props> {
  onSelect = (evt, ...args) => {
    const { onSuggestionSelected } = this.props;
    evt.preventDefault();
    onSuggestionSelected(evt, ...args);
  };

  render() {
    const { wineFamilies } = this.props;

    return (
      <AutoComplete
        datas={wineFamilies}
        onSuggestionSelected={this.onSelect}
        placeholder="Commencer à taper le nom de l'appellation"
      />
    );
  }
}
