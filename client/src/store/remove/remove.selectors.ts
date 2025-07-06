import { RemoveType } from './remove.reducer';

export const getRemovedBottles = (state: RemoveType) => {
  return state.bottleIds;
};

export const isBottleSelectedToBeRemoved = (
  state: RemoveType,
  bottleId: number
) => {
  return state.bottleIds.includes(bottleId);
};
