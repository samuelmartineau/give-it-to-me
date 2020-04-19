import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PictureStepConnected } from './PictureStep';
import { MetaStepConnected } from './MetaStep';
import { PositionStepConnected } from './PositionStep';
import { TypesStepConnected } from './TypesStep';
import { Button, Spinner } from '~/client/components/Toolkit';
import { isModelValid, addWine } from '~/client/store/';

const Form = styled.form`
  max-width: 800px;
  margin: auto;
`;
const ButtonStyled = styled(Button)`
  margin: 1em auto;
`;

type Props = {
  isModelValid: boolean;
  addWine: Function;
};

class AddSteps extends React.Component<Props> {
  state = { isSending: false };

  updateModel = (name) => (value) => {
    this.setState(({ model }) => ({
      model: {
        ...model,
        [name]: value,
      },
    }));
  };
  resetImage = () => {
    this.setState(({ model }) => ({
      model: {
        ...model,
        image: {},
      },
    }));
  };
  onFieldChange = (name, value) => {
    this.updateModel(name)(value);
  };
  onTypeChange = (typesModel) => {
    this.setState(({ model }) => ({ model: { ...model, ...typesModel } }));
  };
  onSubmit = (evt) => {
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
        <Form onSubmit={this.onSubmit}>
          <PictureStepConnected />
          <MetaStepConnected />
          <TypesStepConnected />
          <PositionStepConnected />
          <ButtonStyled type="submit">Envoyer</ButtonStyled>
        </Form>
      );
    }
    return <Spinner />;
  }
}

export const AddStepsConnected = connect(
  (state) => ({
    isModelValid: isModelValid(state),
  }),
  (dispatch) => ({
    addWine() {
      dispatch(addWine());
    },
  })
)(AddSteps);
