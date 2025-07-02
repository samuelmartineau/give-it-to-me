import React from 'react';
import styled from 'styled-components';
import CellsSelector from './CellsSelector';
import { boxes } from '@/components/Cellar/utils';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 30px;
`;

const CellsSelectors = () => {
  return (
    <Wrapper>
      {boxes.map((boxId: number) => (
        <CellsSelector key={boxId} boxId={boxId} />
      ))}
    </Wrapper>
  );
};

export default CellsSelectors;
