import React from 'react';
import styled from 'styled-components';
import CellsSelector from './CellsSelector';
import CellarBoxes from '@/components/Cellar/CellarBoxes';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 30px;
`;

const CellsSelectors = () => {
  return (
    <Wrapper>
      <CellarBoxes>
        {(boxId) => <CellsSelector key={boxId} boxId={boxId} />}
      </CellarBoxes>
    </Wrapper>
  );
};

export default CellsSelectors;
