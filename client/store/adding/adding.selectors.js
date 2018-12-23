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
  'isInBoxes'
];

export const isBoxSelected = (state, boxId) => {
  return state.includes(boxId);
};

export const getSelectedCellsInBox = (selectedCells, boxId) => {
  return selectedCells[boxId];
};
export const isCellSelected = (state, boxId, cellId) => {
  return state[boxId] && state[boxId].includes(cellId);
};

export const isModelValid = (model, selectedBoxes) => {
  let valid = requiredKeys.every(
    key => ![null, 0, '', undefined].includes(model[key])
  );
  if (model.isInBoxes) {
    valid = valid && selectedBoxes.length > 0;
  } else {
    valid = valid && !!selectedBoxes.positionComment;
  }
  return valid;
};

export const getAddModel = (model, selectedCells) => {
  const formModel = { ...model };
  if (formModel.isInBoxes) {
    delete formModel.positionComment;
    delete formModel.count;
    formModel.bottles = Object.keys(selectedCells).reduce((acc, box) => {
      return acc.concat(
        selectedCells[box].map(cell => ({
          box,
          cell
        }))
      );
    }, []);
  }
  return formModel;
};
