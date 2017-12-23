import React from 'react';
import { compose, setDisplayName, withProps } from 'recompose';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { getCellar, reduxPage, setStep } from '../../store';
import withRoot from '../../components/withRoot';
import WithLayout from '../../components/Layout/WithLayout';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import PictureStep from '../../components/Add/PictureStep';
import MetaStep from '../../components/Add/MetaStep';

const styles = theme => ({
  root: {
    width: '90%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    background: theme.palette.background.default
  },
  card: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  actions: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }
});

const steps = ['Informations', 'Type', 'Photo', 'Position'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MetaStep />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return <PictureStep />;
    default:
      return 'Unknown step';
  }
}

const Add = ({ classes, currentStep, changeStep }) => (
  <div className={classes.root}>
    <Paper className={classes.card} elevation={1}>
      <Stepper activeStep={currentStep}>
        {steps.map((label, index) => {
          const props = {};
          const labelProps = {};
          return (
            <Step key={label} {...props}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
    <Paper className={classes.card} elevation={1}>
      {getStepContent(currentStep)}
    </Paper>
    <div className={classes.actions}>
      <Button raised color="primary">
        Finish
      </Button>
    </div>
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
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
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
