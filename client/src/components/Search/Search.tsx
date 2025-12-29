import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearch } from '@tanstack/react-router';
import WinesList from './WinesList';
import { syncUrlParams, getWinesFiltered, RootState } from '@/store';
import SearchFiltersButton from './Filters/SearchFiltersButton';
import SelectedFiltersChips from './Filters/SelectedFiltersChips';
import EmptyResults from './EmptyResults';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector(
    (state: RootState) => getWinesFiltered(state).length,
  );
  const searchParams = useSearch({ from: '/search' });

  useEffect(() => {
    // Sync URL params with Redux store when search params change
    //@ts-ignore
    dispatch(syncUrlParams(searchParams));
  }, [searchParams, dispatch]);

  return (
    <div>
      <SearchFiltersButton />
      <SelectedFiltersChips />
      <h2>
        {count} vin{count > 1 && 's'}
      </h2>
      <WinesList />
      <EmptyResults />
    </div>
  );
};

export default Search;
