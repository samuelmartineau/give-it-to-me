import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import config from '~/config';
import CellarBox from './CellarBox';

const CellarBoxStyled = styled(CellarBox)<{ $selected?: boolean }>`
  cursor: pointer;
  transition: fill 0.15s;

  &:hover {
    fill: #cfe0f5;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      fill: #cfe0f5;
      stroke: ${config.cellar.SELECTED_COLOR};
      stroke-width: 1.2;
    `}
`;

type Props = {
  onSelect: Function;
  boxId: number;
  className?: string;
  selected?: boolean;
};

const CellarBoxSelectable: FC<Props> = ({
  onSelect,
  boxId,
  className,
  selected,
}) => (
  <CellarBoxStyled
    onSelect={() => onSelect(boxId)}
    boxId={boxId}
    className={className}
    $selected={selected}
  />
);

export default CellarBoxSelectable;
