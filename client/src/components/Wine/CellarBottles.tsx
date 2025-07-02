import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '../Cellar/Bottle';
import { getWineBottles, RootState } from '@/store';
import { getBottleInfos, getBottleId } from '../Cellar/utils';

const Cell = ({ bottle }) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <Bottle
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      cell={bottle.cell}
      box={bottle.box}
      color={bottle.color}
    />
  );
};

type RawProps = { wineId: number };

type Props = RawProps & PropsFromRedux;

export const CellarBottles: FC<Props> = ({ bottles }) => {
  return (
    <g>
      {bottles.map((bottle) => (
        <Cell key={getBottleId(bottle.box, bottle.cell)} bottle={bottle} />
      ))}
    </g>
  );
};

const connector = connect((state: RootState, { wineId }: RawProps) => ({
  bottles: getWineBottles(state, wineId),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellarBottles);
