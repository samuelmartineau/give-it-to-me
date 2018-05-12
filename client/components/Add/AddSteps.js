import React from 'react';
import { connect } from 'react-redux';

import { PictureStep } from './PictureStep';
import { MetaStep } from './MetaStep';
import { PositionStep } from './PositionStep';
import { TypesStep } from './TypesStep';
import { Button } from '~/client/components/Toolkit';
import { defaultSelectedTypes } from './types/defaultTypes';

class AddSteps extends React.Component {
  state = {
    model: {
      isInBoxes: true,
      ...defaultSelectedTypes
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      ...prevState
    };
    nextState.model.selectedCells = nextProps.selectedCells;
    return nextState;
  }

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
        <PictureStep
          onUpload={this.updateModel('image')}
          onReset={this.resetImage}
        />
        <MetaStep onMetaChange={this.onFieldChange} />
        <TypesStep onTypeChange={this.onTypeChange} />
        <PositionStep onChange={this.onFieldChange} />
        <Button type="submit">Envoyer</Button>
      </form>
    );
  }
}

export const AddStepsConnected = connect(state => ({
  selectedCells: state.adding.selectedCells
}))(AddSteps);
