import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckboxFilter, RootState } from '@/store/';
import { Label, Text } from './FiltersUtils';
import WineFamilyMultipleSelector from '@/components/Autocomplete/WineFamilyMultipleSelector';
import { FilterResult } from 'fuzzy';
import {
  OnSuggestionSelectedData,
  SearchableWineFamily,
} from '@/components/Autocomplete/WineFamilySuggestion';
import { SearchParams } from '@/routes/search';

const WineFamiliesFilter: React.FC = () => {
  const navigate = useNavigate({ from: '/search' });
  const searchParams = useSearch({ from: '/search' });
  const dispatch = useDispatch();
  const wineFamilies = useSelector(
    (state: RootState) => state.search.wineFamilies,
  );

  const selectWineFamily = (evt: Event, item: OnSuggestionSelectedData) => {
    const { id } = item.suggestion.original;
    const value = id.toString();

    let previousFilter = searchParams.wineFamilies;
    let newFilter: string[] = [];

    if (previousFilter) {
      newFilter = [...previousFilter];
      if (newFilter.includes(value)) {
        newFilter = newFilter.filter((key) => key !== value);
      } else {
        newFilter.push(value);
      }
    } else {
      newFilter.push(value);
    }
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        wineFamilies: newFilter.length ? newFilter : undefined,
      }),
      replace: true,
    });

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
