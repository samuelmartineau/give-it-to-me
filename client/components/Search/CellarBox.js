// @flow
import React from 'react';
import { connect } from 'react-redux';
import CellarBox from '../Cellar/CellarBox';
import { isWineInBox } from '~/client/store';
import styled from 'styled-components';

const CellarBoxStyled = styled(CellarBox)`
  opacity: 0.5;
  ${({ isWineInBox }) =>
    isWineInBox &&
    `
    opacity: 1
  `};
`;

type Props = {
  boxId: number,
  onSelect?: Function,
  className: string
};

const CellarBoxSwitch = ({ boxId, isWineInBox }: Props) => {
  return <CellarBoxStyled boxId={boxId} isWineInBox={isWineInBox} />;
};

export const CellarBoxConnected = connect((state, { boxId, wineId }) => ({
  isWineInBox: isWineInBox(state, boxId, wineId)
}))(CellarBoxSwitch);
