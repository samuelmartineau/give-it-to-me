import { CellsType, MapType } from './bottles.reducer';

export const getCellsUsedInBox = (state: CellsType, boxId: number) => {
  return state[boxId]
    ? Object.keys(state[boxId]).map((id) => parseInt(id, 10))
    : [];
};

export const getBottleById = (state: MapType, boxId: number) => {
  return state[boxId];
};

export const getBottlesInBox = (state: CellsType, boxId: number) =>
  state[boxId] ? Object.values(state[boxId]) : [];

export const getBottleByPosition = (
  state: CellsType,
  boxId: number,
  cellId: number
) => {
  if (state[boxId] && state[boxId][cellId]) {
    return state[boxId][cellId];
  }
  return null;
};
