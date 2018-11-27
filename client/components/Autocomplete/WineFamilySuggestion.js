import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from './AutoComplete';
import { utils } from '~/config';

const WineFamilySuggestion = ({
  wineFamilies,
  onSuggestionSelected,
  selectedFamily,
  onClear
}) => {
  const AreasFormated = wineFamilies.map(wineFamily => ({
    id: wineFamily.id,
    label: wineFamily.name,
    searchKey: utils.cleanString(wineFamily.name)
  }));
  if (selectedFamily) {
    return (
      <div>
        <span>{selectedFamily.name}</span>
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

export default connect((state, { selected }) => ({
  wineFamilies: state.wineFamilies.all,
  selectedFamily: state.wineFamilies.map[selected]
}))(WineFamilySuggestion);
