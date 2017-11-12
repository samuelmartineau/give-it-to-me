import React from "react";
import { compose, setDisplayName } from "recompose";
import { connect } from "react-redux";
import { getCellar, reduxPage, setStep } from "../../store";
import withRoot from "../../components/withRoot";
import WithLayout from "../../components/Layout/WithLayout";
import { withStyles } from "material-ui/styles";
import MobileStepper from "material-ui/MobileStepper";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import PictureStep from "../../components/Add/PictureStep";

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    background: theme.palette.background.default
  }
});

const Add = ({ classes, steps, currentStep, changeStep }) => (
  <div className={classes.root}>
    <Paper square elevation={0} className={classes.header}>
      <Typography>Step {currentStep + 1} of 6</Typography>
    </Paper>
    <PictureStep />
    <MobileStepper
      type="text"
      steps={steps}
      position="static"
      activeStep={currentStep}
      className={classes.mobileStepper}
      nextButton={
        <Button dense onClick={changeStep(currentStep + 1)}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button dense onClick={changeStep(currentStep - 1)}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  </div>
);

const AddConnected = connect(
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
)(Add);

const AddWithLayout = compose(
  setDisplayName("AddPage"),
  withRoot,
  WithLayout,
  withStyles(styles)
)(AddConnected);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default reduxPage(AddWithLayout);
