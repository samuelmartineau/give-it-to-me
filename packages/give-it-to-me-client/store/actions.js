import * as cellar from './cellar/cellar.actions';
import { difference } from 'ramda';
import * as adding from './adding/adding.actions';
import { getBoxCells } from '../components/Cellar/utils';
import { getCellsUsedInBox } from './';

// export * from "./cellar/cellar.actions";
export * from './stepper/stepper.actions';
export { unselectBox } from './adding/adding.actions';

export const getCellar = () => {
  return dispatch => {
    return dispatch(cellar.getCellar());
  };
};
export const selectBox = boxId => {
  return (dispatch, getState) => {
    const cells = getBoxCells(boxId).map(id => id.toString());
    const state = getState();
    const bottles = getCellsUsedInBox(state, boxId);
    const availablesCells = difference(cells, bottles);
    return dispatch(adding.selectBox(boxId, availablesCells[0]));
  };
};
