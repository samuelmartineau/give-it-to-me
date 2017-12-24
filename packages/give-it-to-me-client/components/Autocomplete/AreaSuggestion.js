import React from 'react';
import Autocomplete from './AutoComplete';
import { wineFamilies, utils } from 'give-it-to-me-config';
const AreasFormated = Object.keys(wineFamilies).map(id => ({
  id,
  label: wineFamilies[id],
  searchKey: utils.cleanString(wineFamilies[id])
}));

const AreaSuggestion = ({ onSuggestionSelected }) => (
  <Autocomplete
    datas={AreasFormated}
    onSuggestionSelected={onSuggestionSelected}
  />
);

export default AreaSuggestion;
