import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL,
  UPDATE_MODEL,
  RESET_ADD_WINE
} from './adding.types';

export const selectBox = (boxId, cellId) => ({
  type: SELECT_BOX,
  payload: {
    boxId,
    cellId
  }
});
export const unselectBox = boxId => ({
  type: UNSELECT_BOX,
  payload: { boxId }
});
export const selectCell = (boxId, cellId) => ({
  type: SELECT_CELL,
  payload: { boxId, cellId }
});
export const unselectCell = (boxId, cellId) => ({
  type: UNSELECT_CELL,
  payload: { boxId, cellId }
});
export const updateModel = (name, value) => ({
  type: UPDATE_MODEL,
  payload: { name, value }
});
export const resetAddWine = () => ({
  type: RESET_ADD_WINE
});
export const addWine = wineModel => async (dispatch, _, { addWine }) => {
  try {
    await addWine(wineModel);
    dispatch(resetAddWine());
    alert('Ajout avec succès');
  } catch (error) {
    console.error(error);
  }
};
