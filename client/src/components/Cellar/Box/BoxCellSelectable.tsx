import React, { FC } from 'react';
import styled from 'styled-components';

import BoxCell from './BoxCell';

const BoxCellStyled = styled(BoxCell)`
  cursor: pointer;

  &:hover {
    fill: #7098d6;
  }
`;

type Props = {
  onSelect: (boxId: number, cellId: number) => void;
  boxId: number;
  cellId: number;
};

const BoxCellSelectable: FC<Props> = ({ onSelect, boxId, cellId }) => {
  return (
    <BoxCellStyled onSelect={() => onSelect(boxId, cellId)} cellId={cellId} />
  );
};

export default BoxCellSelectable;
