import React from 'react';
import { AutoComplete } from './AutoComplete';

type SearchableWineFamily = { id: number; label: string; searchKey: string };

type Props = {
  wineFamilies: SearchableWineFamily[];
  onSuggestionSelected: Function;
};

export class WineFamilySuggestion extends React.Component<Props> {
  onSelect = (evt, ...args) => {
    const { onSuggestionSelected } = this.props;
    evt.preventDefault();
    onSuggestionSelected(evt, ...args);
  };

  extract = (item: SearchableWineFamily) => {
    return item.searchKey;
  };

  render() {
    const { wineFamilies } = this.props;

    return (
      <AutoComplete<SearchableWineFamily>
        name="wineFamily"
        extract={this.extract}
        datas={wineFamilies}
        onSuggestionSelected={this.onSelect}
        placeholder="Commencer à taper le nom de l'appellation"
      />
    );
  }
}
