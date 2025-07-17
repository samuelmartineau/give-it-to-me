import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import CellarBox from '../Cellar/CellarBox';
import { isWineInBox, RootState } from '@/store';
import styled from 'styled-components';

export const CellarBoxStyled = styled(CellarBox)<{ isWineInBox: boolean }>`
  opacity: 0.5;
  ${({ isWineInBox }) =>
    isWineInBox &&
    `
    opacity: 1
  `};
`;

type RawProps = { boxId: number; wineId: number };

type Props = RawProps & PropsFromRedux;

const CellarBoxSwitch: FC<Props> = ({ boxId, isWineInBox }) => {
  return <CellarBoxStyled boxId={boxId} isWineInBox={isWineInBox} />;
};

const connector = connect((state: RootState, { boxId, wineId }: RawProps) => ({
  isWineInBox: isWineInBox(state, boxId, wineId),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export const CellarBoxConnected = connector(CellarBoxSwitch);
