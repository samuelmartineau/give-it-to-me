import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { makeStore, getCellar } from '../store';

const store = makeStore({});

export default async () => {
  await store.dispatch(getCellar());
  return function ProviderDecorator(storyFn) {
    return <ReduxProvider store={store}>{storyFn()}</ReduxProvider>;
  };
};
