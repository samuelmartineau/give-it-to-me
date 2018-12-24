// @flow
import React from 'react';
import WinesList from './WinesList';
import SearchFiltersButton from './Filters/SearchFiltersButton';
import EmptyResults from './EmptyResults';

export const Search = () => {
  return (
    <div>
      <SearchFiltersButton />
      <WinesList />
      <EmptyResults />
    </div>
  );
};
