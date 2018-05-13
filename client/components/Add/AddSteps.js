import React from 'react';
import { connect } from 'react-redux';
import { PictureStepConnected } from './PictureStep';
import { MetaStepConnected } from './MetaStep';
import { PositionStepConnected } from './PositionStep';
import { TypesStepConnected } from './TypesStep';
import { Button, Spinner } from '~/client/components/Toolkit';
import { isModelValid, addWine } from '~/client/store/';
class AddSteps extends React.Component {
  state = { isSending: false };

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
    const { isModelValid } = this.props;
    if (!isModelValid) {
      alert('Il manque des champs');
    } else {
      this.props.addWine();
    }
  };
  render() {
    const { isSending } = this.state;
    if (!isSending) {
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
    return <Spinner />;
  }
}

export const AddStepsConnected = connect(
  state => ({
    isModelValid: isModelValid(state)
  }),
  dispatch => ({
    addWine() {
      dispatch(addWine());
    }
  })
)(AddSteps);
