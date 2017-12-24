import { SET_STEP } from './adding.types';

export const reducer = (
  state = {
    boxes: [],
    cells: {}
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

export const isLastStep = ({ steps }, index) => index === steps - 1;

export default reducer;
