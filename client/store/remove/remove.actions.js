import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE,
  SET_COUNT,
  RESET_REMOVE_STATE,
  SELECT_WINE_TO_REMOVE
} from './remove.types';

export const selectBottleToDelete = bottleId => ({
  type: SELECT_BOTTLE_TO_DELETE,
  payload: { bottleId }
});

export const unselectBottleToDelete = bottleId => ({
  type: UNSELECT_BOTTLE_TO_DELETE,
  payload: { bottleId }
});
export const setRemoveCount = value => ({
  type: SET_COUNT,
  payload: { value }
});
export const resetRemoveState = () => ({
  type: RESET_REMOVE_STATE
});
export const selectWineToRemove = wineId => ({
  type: SELECT_WINE_TO_REMOVE,
  payload: { wineId }
});

export const removeBottles = bottleIds => async (
  dispatch,
  _,
  { removeBottles }
) => {
  try {
    await removeBottles(bottleIds);
    dispatch(resetRemoveState());
    alert('Suppréssion avec succès');
  } catch (error) {
    console.error(error);
  }
};

export const removeOutsideBottles = (wineId, count) => async (
  dispatch,
  _,
  { removeOutsideBottles }
) => {
  try {
    await removeOutsideBottles(wineId, count);
    dispatch(resetRemoveState());
    alert('Suppréssion avec succès');
  } catch (error) {
    console.error(error);
  }
};
