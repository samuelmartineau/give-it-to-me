import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BoxesSelector from './Boxes/BoxesSelector';
import CellSelector from './Cell/CellSelector';
import WineWizard from './WineWizard';
import { Card, Hint, Section, SectionTitle } from '@/components/Toolkit';
import { RootState } from '@/store';

const Details = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const OutsideDetails = styled.div`
  max-width: 360px;

  @media (max-width: 760px) {
    margin: 0 auto;
  }
`;

const BoxCard = styled(Card)`
  width: 100%;

  & svg {
    max-width: 460px;
    margin: 0 auto;
    display: block;
  }
`;

const Step = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 1.1rem;
  vertical-align: middle;
`;

export const Browse = () => {
  const boxId = useSelector((state: RootState) => state.browse.boxId);
  const cellId = useSelector((state: RootState) => state.browse.cellId);
  const hasBox = boxId !== undefined && boxId !== null;
  const hasCell = cellId !== undefined && cellId !== null;
  const outsideWineId = useSelector(
    (state: RootState) => state.browse.outsideWineId,
  );
  const hasOutsideWine = outsideWineId !== undefined;
  const detailsRef = useRef<React.ComponentRef<'section'>>(null);

  // On small screens the chosen box appears below the fold: bring it into view.
  useEffect(() => {
    if (hasBox || hasOutsideWine) {
      detailsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [boxId, hasBox, outsideWineId, hasOutsideWine]);

  return (
    <div>
      <SectionTitle>
        <Step>1</Step>Choisis une caisse ou une bouteille
      </SectionTitle>
      <Hint>
        Touche une caisse où il y a des bouteilles, ou une bouteille rangée hors
        des caisses.
      </Hint>
      <BoxesSelector />

      {hasBox && (
        <Section ref={detailsRef}>
          <SectionTitle>
            <Step>2</Step>Choisis une bouteille
          </SectionTitle>
          <Hint>
            {hasCell
              ? 'Voilà le vin de la bouteille en bleu.'
              : 'Touche une bouteille pour savoir quel vin c’est.'}
          </Hint>
          <Details>
            <BoxCard>
              <CellSelector />
            </BoxCard>
            <WineWizard />
          </Details>
        </Section>
      )}

      {hasOutsideWine && (
        <Section ref={detailsRef}>
          <SectionTitle>
            <Step>2</Step>Le vin choisi
          </SectionTitle>
          <Hint>Ce vin est rangé hors des caisses.</Hint>
          <OutsideDetails>
            <WineWizard />
          </OutsideDetails>
        </Section>
      )}
    </div>
  );
};
