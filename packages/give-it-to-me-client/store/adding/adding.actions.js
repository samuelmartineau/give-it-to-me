import { SET_STEP } from './stepper.types';

export const setStep = index => ({
  type: SET_STEP,
  index
});
