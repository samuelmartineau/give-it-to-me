import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';

import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import CellarBottles from '@/components/Cellar/CellarBottles';
import CellarBox from '@/components/Cellar/CellarBox';
import { Card, Section, SectionTitle } from '@/components/Toolkit';
import { YearsChart } from './YearsChart';
import { RootState } from '@/store';
import { Transactions } from '../Transaction/Transactions';

const Greeting = styled.p`
  margin: -12px 0 24px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Stats = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0;

  ${({ theme }) => theme.media.handheld`
    gap: 8px;
  `};
`;

const Stat = styled(Card)`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 2px;
  padding: 18px 20px;

  ${({ theme }) => theme.media.handheld`
    padding: 10px 14px;
  `};
`;

const StatValue = styled.dd`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.media.handheld`
    font-size: 1.7rem;
  `};
`;

const StatLabel = styled.dt`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 260px;

  @media (max-width: 900px) {
    flex-direction: row;
    min-width: 0;
  }

  /* On phones the header already shows "Ajouter" and "Rechercher". */
  ${({ theme }) => theme.media.handheld`
    display: none;
  `};
`;

const ActionLink = styled(Link)<{ $primary?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 60px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.size.radius};
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadow};
  background: ${({ theme, $primary }) =>
    $primary ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $primary }) =>
    $primary ? theme.colors.onPrimary : theme.colors.secondary};
  border: 2px solid
    ${({ theme, $primary }) =>
      $primary ? theme.colors.primary : theme.colors.secondary};

  & svg {
    font-size: 1.8rem;
  }

  &:hover {
    background: ${({ theme, $primary }) =>
      $primary ? theme.colors.primaryDark : theme.colors.secondaryVarient};
  }

  ${({ theme }) => theme.media.handheld`
    font-size: 1.05rem;
    padding: 0 10px;
    gap: 6px;
  `};
`;

type Props = PropsFromRedux;

const Home: FC<Props> = ({ wines, favoritesCount }) => {
  const bottlesCount = wines.reduce((acc, wine) => acc + wine.bottlesCount, 0);
  const owner = import.meta.env.GITM_OWNER;

  return (
    <div>
      <Greeting>
        Bonjour{owner ? ` ${owner}` : ''} ! Voici où en est ta cave.
      </Greeting>

      <Top>
        <Stats>
          <Stat as="div">
            <StatValue>{bottlesCount}</StatValue>
            <StatLabel>Bouteilles</StatLabel>
          </Stat>
          <Stat as="div">
            <StatValue>{wines.length}</StatValue>
            <StatLabel>Vins</StatLabel>
          </Stat>
          <Stat as="div">
            <StatValue>{favoritesCount}</StatValue>
            <StatLabel>Favoris</StatLabel>
          </Stat>
        </Stats>
        <Actions>
          <ActionLink to="/add" $primary>
            <AddIcon />
            Ajouter une bouteille
          </ActionLink>
          <ActionLink to="/search">
            <SearchIcon />
            Chercher un vin
          </ActionLink>
        </Actions>
      </Top>

      <Section>
        <SectionTitle>Ma cave</SectionTitle>
        <CellarContainer>
          <CellarBoxes>
            {(boxId) => <CellarBox key={boxId} boxId={boxId} />}
          </CellarBoxes>
          <CellarBottles />
        </CellarContainer>
      </Section>

      {wines.length > 0 && (
        <Section>
          <SectionTitle>Bouteilles par année</SectionTitle>
          <Card>
            <YearsChart wines={wines} />
          </Card>
        </Section>
      )}

      <Section>
        <Transactions />
      </Section>
    </div>
  );
};

const connector = connect(({ wines, favorites }: RootState) => {
  return {
    wines: wines.all.map((id) => wines.map[id]),
    favoritesCount: favorites.all.length,
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
