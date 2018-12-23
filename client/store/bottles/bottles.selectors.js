export const getCellsUsedInBox = (state, boxId) => {
  return state[boxId]
    ? Object.keys(state[boxId]).map(id => parseInt(id, 10))
    : [];
};

export const getBottleById = (state, boxId) => {
  return state[boxId];
};

export const getBottlesInBox = (state, boxId) =>
  state[boxId] ? Object.values(state[boxId]) : [];

export const getBottleByPosition = (state, boxId, cellId) => {
  if (state[boxId] && state[boxId][cellId]) {
    return state[boxId][cellId];
  }
  return null;
};
