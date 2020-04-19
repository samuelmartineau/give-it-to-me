import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE,
  SET_COUNT,
  RESET_REMOVE_STATE,
  SELECT_WINE_TO_REMOVE,
} from './remove.types';

export const selectBottleToDelete = (bottleId: number) =>
  <const>{
    type: SELECT_BOTTLE_TO_DELETE,
    payload: { bottleId },
  };

export const unselectBottleToDelete = (bottleId: number) =>
  <const>{
    type: UNSELECT_BOTTLE_TO_DELETE,
    payload: { bottleId },
  };
export const setRemoveCount = (value: number) =>
  <const>{
    type: SET_COUNT,
    payload: { value },
  };
export const resetRemoveState = () =>
  <const>{
    type: RESET_REMOVE_STATE,
  };
export const selectWineToRemove = (wineId: number) =>
  <const>{
    type: SELECT_WINE_TO_REMOVE,
    payload: { wineId },
  };

export const removeBottles = (bottleIds) => async (
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

export type RemoveActions = ReturnType<
  | typeof selectBottleToDelete
  | typeof unselectBottleToDelete
  | typeof setRemoveCount
  | typeof resetRemoveState
  | typeof unselectBottleToDelete
  | typeof selectWineToRemove
>;
