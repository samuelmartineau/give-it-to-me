import React from 'react';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import PictureStep from './PictureStep';
import MetaStep from './MetaStep';

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

class AddSteps extends React.Component {
  state = {
    currentStep: 0
  };
  render() {
    const { classes, changeStep, width } = this.props;
    const isMobile = width === 'xs';

    return (
      <div className={classes.root}>
        <Paper className={classes.card} elevation={1}>
          <Stepper
            activeStep={this.state.currentStep}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            {steps.map(label => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  <StepContent>
                    {isMobile && getStepContent(this.state.currentStep)}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Paper>
        {!isMobile && (
          <Paper className={classes.card} elevation={1}>
            {getStepContent(this.state.currentStep)}
          </Paper>
        )}
        <div className={classes.actions}>
          <Button raised color="primary">
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(AddSteps));
