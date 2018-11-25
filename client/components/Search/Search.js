// @flow
import React from 'react';
import WinesList from './WinesList';
import SearchFilters from './SearchFilters';
import EmptyResults from './EmptyResults';

export const Search = () => {
  return (
    <div>
      <SearchFilters />
      <WinesList />
      <EmptyResults />
    </div>
  );
};
