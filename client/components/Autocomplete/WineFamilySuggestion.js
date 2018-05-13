import React from 'react';
import Autocomplete from './AutoComplete';
import { wineFamilies, utils } from '~/config';
const AreasFormated = Object.keys(wineFamilies).map(id => ({
  id,
  label: wineFamilies[id],
  searchKey: utils.cleanString(wineFamilies[id])
}));

export const WineFamilySuggestion = ({
  onSuggestionSelected,
  selected,
  onClear
}) => {
  if (selected) {
    const wineFamily = wineFamilies[selected];
    return (
      <div>
        <span>{wineFamily}</span>
        <button type="button" onClick={onClear}>
          x
        </button>
      </div>
    );
  }
  return (
    <label>
      AOC
      <Autocomplete
        datas={AreasFormated}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Commncer à taper le nom de l'AOC"
      />
    </label>
  );
};
