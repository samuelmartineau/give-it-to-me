// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import CellarBottles from '~/client/components/Cellar/CellarBottles';
import CellarBox from '~/client/components/Cellar/CellarBox';
import config from '~/config';
import { YearsChart } from './YearsChart';

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 1rem;
`;

type Props = {};

const Home = ({ wines, bottles }: Props) => (
  <div>
    <Title>
      Bonjour {config.owner}, il te reste {wines.length} vin
      {wines.length && 's'} pour un total de {bottles.length} bouteille
      {bottles.length && 's'} 😃
    </Title>
    <CellarContainer>
      <CellarBoxes>
        {boxId => <CellarBox key={boxId} boxId={boxId} />}
      </CellarBoxes>
      <CellarBottles />
    </CellarContainer>
    <YearsChart wines={wines} />
  </div>
);
export default connect(({ wines, bottles }) => {
  return { wines: wines.all.map(id => wines.map[id]), bottles: bottles.all };
})(Home);
