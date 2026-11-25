import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { PictureStepConnected } from './PictureStep';
import { MetaStepConnected } from './MetaStep';
import { PositionStepConnected } from './PositionStep';
import { TypesStepConnected } from './TypesStep';
import CheckIcon from '@mui/icons-material/CheckCircleRounded';
import { Button, Card, Spinner } from '@/components/Toolkit';
import { isModelValid, addWine, RootState } from '@/store/';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getCellar } from '@/store/wines/wines.actions';

const Form = styled.form`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StepTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px;
  font-size: 1.4rem;
`;
const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 1.1rem;
`;
const Submit = styled.div`
  position: sticky;
  bottom: 0;
  padding: 12px 0;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.background} 30%
  );
`;
const ButtonStyled = styled(Button)`
  width: 100%;
  min-height: 64px;
  font-size: 1.25rem;
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
        <Card>
          <StepTitle>
            <StepNumber>1</StepNumber>Photo de l’étiquette
          </StepTitle>
          <PictureStepConnected />
        </Card>
        <Card>
          <StepTitle>
            <StepNumber>2</StepNumber>Le vin
          </StepTitle>
          <MetaStepConnected />
        </Card>
        <Card>
          <StepTitle>
            <StepNumber>3</StepNumber>Couleur et bouteille
          </StepTitle>
          <TypesStepConnected />
        </Card>
        <Card>
          <StepTitle>
            <StepNumber>4</StepNumber>Emplacement
          </StepTitle>
          <PositionStepConnected />
        </Card>
        <Submit>
          <ButtonStyled type="submit" primary>
            <CheckIcon />
            Ajouter à la cave
          </ButtonStyled>
        </Submit>
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
