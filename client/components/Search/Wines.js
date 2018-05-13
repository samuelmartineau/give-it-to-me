// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getWinesFiltered } from '~/client/store/';
import { WineCardConnected } from '../Wine/WineCardConnected';

type Props = {};

export const Wines = props => {
  return (
    <div>
      {props.wines.map(wineId => (
        <WineCardConnected key={wineId} wineId={wineId} />
      ))}
    </div>
  );
};

export const WinesConnected = connect(state => ({
  wines: getWinesFiltered(state)
}))(Wines);
