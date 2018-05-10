import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../../store';
const initialState = {
  cellar: {
    bottles: {
      all: [1, 2, 3],
      map: {
        1: {},
        2: {},
        3: {}
      }
    }
  }
};
const store = makeStore(initialState);
export default class Wrapper extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
