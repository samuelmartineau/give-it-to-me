import React from 'react';
import { connect } from 'react-redux';

import { PictureStepConnected } from './PictureStep';
import { MetaStepConnected } from './MetaStep';
import { PositionStepConnected } from './PositionStep';
import { TypesStepConnected } from './TypesStep';
import { Button } from '~/client/components/Toolkit';

class AddSteps extends React.Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const nextState = {
  //     ...prevState
  //   };
  //   nextState.model.selectedCells = nextProps.selectedCells;
  //   return nextState;
  // }

  updateModel = name => value => {
    this.setState(({ model }) => ({
      model: {
        ...model,
        [name]: value
      }
    }));
  };
  resetImage = () => {
    this.setState(({ model }) => ({
      model: {
        ...model,
        image: {}
      }
    }));
  };
  onFieldChange = (name, value) => {
    this.updateModel(name)(value);
  };
  onTypeChange = typesModel => {
    this.setState(({ model }) => ({ model: { ...model, ...typesModel } }));
  };
  onSubmit = evt => {
    evt.preventDefault();
    console.log('good', this.state.model);
    // this.forceUpdate();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <PictureStepConnected />
        <MetaStepConnected />
        <TypesStepConnected />
        <PositionStepConnected />
        <Button type="submit">Envoyer</Button>
      </form>
    );
  }
}

export const AddStepsConnected = connect(state => ({
  // model: state.adding.model
}))(AddSteps);
