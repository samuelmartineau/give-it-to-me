import React from 'react';
import { AutoComplete } from './AutoComplete';
import { FilterResult } from 'fuzzy';

export type SearchableWineFamily = {
  id: number;
  label: string;
  searchKey: string;
};

export type OnSuggestionSelectedData = {
  method: string;
  suggestion: FilterResult<SearchableWineFamily>;
};

type Props = {
  wineFamilies: SearchableWineFamily[];
  onSuggestionSelected: (evt: Event, data: OnSuggestionSelectedData) => void;
};

export class WineFamilySuggestion extends React.Component<Props> {
  onSelect = (evt, item) => {
    const { onSuggestionSelected } = this.props;
    evt.preventDefault();
    onSuggestionSelected(evt, item);
  };

  extract = (item: SearchableWineFamily) => {
    return item.searchKey;
  };

  render() {
    const { wineFamilies } = this.props;

    return (
      <AutoComplete<SearchableWineFamily>
        name="wineFamily"
        datas={wineFamilies}
        extract={this.extract}
        onSuggestionSelected={this.onSelect}
        placeholder="Commencer à taper le nom de l'appellation"
      />
    );
  }
}
