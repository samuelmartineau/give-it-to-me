import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { PictureStepConnected } from './PictureStep';
import { MetaStepConnected } from './MetaStep';
import { PositionStepConnected } from './PositionStep';
import { TypesStepConnected } from './TypesStep';
import { Button, Spinner } from '@/components/Toolkit';
import { isModelValid, addWine, RootState } from '@/store/';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getCellar } from '@/store/wines/wines.actions';

const Form = styled.form`
  max-width: 800px;
  margin: auto;
`;
const ButtonStyled = styled(Button)`
  margin: 1em auto;
`;

type Props = PropsFromRedux;

const AddSteps: FC<Props> = ({ isModelValid, addWine }) => {
  const [sending, setSending] = useState(false);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!isModelValid) {
      alert('Il manque des champs');
    } else {
      setSending(true);
      await addWine();
      setSending(false);
    }
  };

  if (!sending) {
    return (
      <Form onSubmit={onSubmit}>
        <PictureStepConnected />
        <MetaStepConnected />
        <TypesStepConnected />
        <PositionStepConnected />
        <ButtonStyled type="submit">Envoyer</ButtonStyled>
      </Form>
    );
  }
  return <Spinner />;
};

const connector = connect(
  (state: RootState) => ({ isModelValid: isModelValid(state) }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    async addWine() {
      await dispatch(addWine());
      await dispatch(getCellar());
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const AddStepsConnected = connector(AddSteps);
