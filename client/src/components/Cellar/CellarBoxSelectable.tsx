import React, { FC } from 'react';
import styled from 'styled-components';
import CellarBox from './CellarBox';

const CellarBoxStyled = styled(CellarBox)`
  cursor: pointer;

  &:hover {
    fill: #7098d6;
  }
`;

type Props = {
  onSelect: Function;
  boxId: number;
  className?: string;
};

const CellarBoxSelectable: FC<Props> = ({ onSelect, boxId, className }) => (
  <CellarBoxStyled
    onSelect={() => onSelect(boxId)}
    boxId={boxId}
    className={className}
  />
);

export default CellarBoxSelectable;
