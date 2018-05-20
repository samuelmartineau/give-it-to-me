// @flow
import React from 'react';
import { WinesConnected } from './Wines';
import { FiltersConnected } from './Filters';
import { EmptyResultsConnected } from './EmptyResults';

type Props = {};

export const Search = () => {
  return (
    <div>
      <FiltersConnected />
      <WinesConnected />
      <EmptyResultsConnected />
    </div>
  );
};
