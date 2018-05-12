// @flow
import React from 'react';
import BoxFilter from './BoxFilter';
import { boxes } from '../../../Cellar/utils';
import styled from 'styled-components';

type CellsSelectorsProps = {
  classes: {
    cellSelectors: any
  }
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 30px;
`;

const CellsSelectors = ({  }: CellsSelectorsProps) => {
  return (
    <Wrapper>
      {boxes.map(boxId => <BoxFilter key={boxId} boxId={boxId} />)}
    </Wrapper>
  );
};

export default CellsSelectors;
