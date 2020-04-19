export const getRemovedBottles = state => {
  return state.bottleIds;
};

export const isBottleSelectedToBeRemoved = (state, bottleId) => {
  return state.bottleIds.includes(bottleId);
};
