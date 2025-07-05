import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter, RootState } from '@/store/';
import { Label, Text } from './FiltersUtils';
import WineFamilyMultipleSelector from '@/components/Autocomplete/WineFamilyMultipleSelector';

const WineFamiliesFilter: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wineFamilies = useSelector((state: RootState) => state.search.wineFamilies);

  const selectWineFamily = (evt, item) => {
    const { id } = item.suggestion.original;
    const name = 'wineFamilies';
    const value = id.toString();

    const parsed = queryString.parse(location.search);

    let previousFilter = parsed[name];

    if (previousFilter) {
      previousFilter = [].concat(previousFilter);
      if (previousFilter.includes(value)) {
        previousFilter = previousFilter.filter((key) => key !== value);
        if (previousFilter.length === 0) {
          delete parsed[name];
        }
      } else {
        previousFilter.push(value);
      }
    } else {
      parsed[name] = [value];
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    navigate({ to: url, replace: true });

    dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));
  };

  return (
    <Label>
      <Text>Appelation</Text>
      <WineFamilyMultipleSelector
        selectedFamilyIds={wineFamilies}
        onSuggestionSelected={selectWineFamily}
      />
    </Label>
  );
};

export default WineFamiliesFilter;
