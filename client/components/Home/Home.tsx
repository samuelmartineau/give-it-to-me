import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import CellarBottles from '~/client/components/Cellar/CellarBottles';
import CellarBox from '~/client/components/Cellar/CellarBox';
import config from '~/config';
import { YearsChart } from './YearsChart';
import { RootState } from '~/client/store';

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 1rem;
`;

type Props = PropsFromRedux;

const Home: FC<Props> = ({ wines, bottles }) => (
  <div>
    <Title>
      Bonjour {config.owner}, il te reste {wines.length} vin
      {wines.length && 's'} pour un total de {bottles.length} bouteille
      {bottles.length && 's'} 😃
    </Title>
    <CellarContainer>
      <CellarBoxes>
        {(boxId) => <CellarBox key={boxId} boxId={boxId} />}
      </CellarBoxes>
      <CellarBottles />
    </CellarContainer>
    <YearsChart wines={wines} />
  </div>
);

const connector = connect(({ wines, bottles }: RootState) => {
  return { wines: wines.all.map((id) => wines.map[id]), bottles: bottles.all };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
