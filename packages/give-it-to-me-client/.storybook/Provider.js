import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "../store";

const initialState = {
  cellar: {},
  bottles: {
    all: [
      {
        id: 1,
        box: 25,
        cell: 6
      },
      {
        id: 2,
        box: 25,
        cell: 7
      },
      {
        id: 3,
        box: 25,
        cell: 8
      }
    ],
    cells: {}
  }
};

const store = makeStore(initialState);

export default function ProviderDecorator(storyFn) {
  return <ReduxProvider store={store}>{storyFn()}</ReduxProvider>;
}
