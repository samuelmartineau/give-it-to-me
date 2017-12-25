import { SET_STEP } from './adding.types';

export const reducer = (
  state = {
    selectedCells: {}
  },
  action
) => {
  switch (action.type) {
    // case SET_STEP: {
    //   return {
    //     ...state,
    //     currentStep: action.index
    //   };
    // }
    default:
      return state;
  }
};

export const getSelectedCells = selectedCells =>
  Object.keys(selectedCells).reduce((acc, boxId) => {
    return acc.concat(
      selectedCells[boxId].map(cellId => ({
        box: boxId,
        cell: cellId
      }))
    );
  }, []);

export const getSelectedBoxes = selectedCells => Object.keys(selectedCells);

export default reducer;
