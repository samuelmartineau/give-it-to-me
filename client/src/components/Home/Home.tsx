import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import CellarBottles from '@/components/Cellar/CellarBottles';
import CellarBox from '@/components/Cellar/CellarBox';
import { YearsChart } from './YearsChart';
import { RootState } from '@/store';
import { Transactions } from '../Transaction/Transactions';

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 1rem;
`;

type Props = PropsFromRedux;

const Home: FC<Props> = ({ wines, bottles }) => {
  const hasWines = wines.length > 0;
  return (
    <div>
      <Title>
        <div>Bonjour {import.meta.env.GITM_OWNER}.</div>
        {hasWines && (
          <div>
            Il te reste {wines.length} vin
            {wines.length && 's'} pour un total de {bottles.length} bouteille
            {bottles.length && 's'} 😃
          </div>
        )}
      </Title>
      <CellarContainer>
        <CellarBoxes>
          {(boxId) => <CellarBox key={boxId} boxId={boxId} />}
        </CellarBoxes>
        <CellarBottles />
      </CellarContainer>
      <YearsChart wines={wines} />
      <Transactions />
    </div>
  );
};

const connector = connect(({ wines, bottles }: RootState) => {
  return { wines: wines.all.map((id) => wines.map[id]), bottles: bottles.all };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
