import { SET_STEP } from './stepper.types';

export const reducer = (
  state = {
    steps: 4,
    currentStep: 0
  },
  action
) => {
  switch (action.type) {
    case SET_STEP: {
      return {
        ...state,
        currentStep: action.index
      };
    }
    default:
      return state;
  }
};

export const isLastStep = ({ steps }, index) => index === steps - 1;

export default reducer;
