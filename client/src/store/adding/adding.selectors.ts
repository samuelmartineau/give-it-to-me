import commonjs from 'vite-plugin-commonjs';
import { ModelType, SelectedCellsType } from './adding.reducer';

const requiredKeys = [
  'name',
  'year',
  'wineFamily',
  'blur',
  'thumbnailFileName',
  'pictureFileName',
  'wineType',
  'wineCategory',
  'bottleType',
  'isInBoxes',
];

export const isBoxSelected = (state, boxId) => {
  return state.includes(boxId);
};

export const getSelectedCellsInBox = (
  selectedCells: SelectedCellsType,
  boxId: number,
) => {
  return selectedCells[boxId];
};
export const isCellSelected = (
  state: SelectedCellsType,
  boxId: number,
  cellId: number,
) => {
  return state[boxId] && state[boxId].includes(cellId);
};

export const isModelValid = (model, selectedBoxes) => {
  let valid = requiredKeys.every(
    (key) => ![null, 0, '', undefined].includes(model[key]),
  );
  if (model.isInBoxes) {
    valid = valid && selectedBoxes.length > 0;
  } else {
    valid = valid && !!model.positionComment && model.count > 0;
  }
  return valid;
};

export const getAddModel = (
  model: ModelType,
  selectedCells: { [boxId: number]: number[] },
) => {
  const { positionComment, count, bottles, ...common } = model;
  if (model.isInBoxes) {
    return {
      ...common,
      positionComment,
      count,
    };
  }
  return {
    ...common,
    bottles: Object.keys(selectedCells).reduce((acc, box) => {
      return acc.concat(
        selectedCells[box].map((cell) => ({
          box,
          cell,
        })),
      );
    }, []),
  };
};
