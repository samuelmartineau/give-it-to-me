import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { makeStore } from '../store';
import { getCellar } from '../store';

const store = makeStore({});

(async function() {
  await store.dispatch(getCellar());
})();

export default function ProviderDecorator(storyFn) {
  return <ReduxProvider store={store}>{storyFn()}</ReduxProvider>;
}
