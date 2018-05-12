import React from 'react';
import Autocomplete from './AutoComplete';
import { wineFamilies, utils } from '~/config';
const AreasFormated = Object.keys(wineFamilies).map(id => ({
  id,
  label: wineFamilies[id],
  searchKey: utils.cleanString(wineFamilies[id])
}));

export const AreaSuggestion = ({ onSuggestionSelected, selected }) => (
  <Autocomplete
    datas={AreasFormated}
    onSuggestionSelected={onSuggestionSelected}
    placeholder="Commncer à taper le nom de l'AOC"
  />
);
