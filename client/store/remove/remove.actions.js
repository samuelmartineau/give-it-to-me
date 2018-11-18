import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE
} from './remove.types';

export const selectBottleToDelete = bottleId => ({
  type: SELECT_BOTTLE_TO_DELETE,
  payload: { bottleId }
});

export const unselectBottleToDelete = bottleId => ({
  type: UNSELECT_BOTTLE_TO_DELETE,
  payload: { bottleId }
});
