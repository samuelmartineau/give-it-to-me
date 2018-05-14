// @flow
import React from 'react';
import { WinesConnected } from './Wines';
import { FiltersConnected } from './Filters';

type Props = {};

export const Search = () => {
  return (
    <div>
      seach
      <FiltersConnected />
      <WinesConnected />
    </div>
  );
};
