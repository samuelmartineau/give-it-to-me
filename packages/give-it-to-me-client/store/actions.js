import * as cellar from './cellar/cellar.actions';
import { difference } from 'ramda';
import * as adding from './adding/adding.actions';
import { getBoxCell } from '../components/Cellar/utils';
import { getbottlesInBox } from './';

// export * from "./cellar/cellar.actions";
export * from './stepper/stepper.actions';

export const getCellar = () => {
  return dispatch => {
    return dispatch(cellar.getCellar());
  };
};
export const selectBox = boxId => {
  return (dispatch, getState) => {
    const cells = getBoxCell(boxId).map(id => id.toString());
    const state = getState();
    const bottles = getbottlesInBox(state, boxId);
    const availablesCells = difference(cells, bottles);
    return dispatch(adding.selectBox(boxId, availablesCells[0]));
  };
};
