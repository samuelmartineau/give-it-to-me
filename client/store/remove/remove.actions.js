import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE,
  SET_COUNT
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

export const removeBottles = bottleIds => async (
  dispatch,
  _,
  { removeBottles }
) => {
  try {
    await removeBottles(bottleIds);
    alert('Suppréssion avec succès');
  } catch (error) {
    console.error(error);
  }
};
