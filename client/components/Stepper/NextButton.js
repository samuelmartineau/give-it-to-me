import React from 'react';
import { connect } from 'react-redux';
import { setStep } from '../../store';
import Button from 'material-ui/Button';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const NextButton = ({ currentStep, changeStep, disabled }) => (
  <Button disabled={disabled} dense onClick={changeStep(currentStep + 1)}>
    Next
    <KeyboardArrowRight />
  </Button>
);

export default connect(
  state => {
    return { ...state.stepper };
  },
  dispatch => ({
    changeStep(index) {
      return () => {
        dispatch(setStep(index));
      };
    }
  })
)(NextButton);
