import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '../Cellar/Bottle';
import { getWineBottles, RootState } from '@/store';
import { getBottleInfos, getBottleId } from '../Cellar/utils';
import { EnhancedBottleType } from '@/Cellar.type';

const Cell: FC<{ bottle: EnhancedBottleType }> = ({ bottle }) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <Bottle
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      cell={bottle.cell}
      box={bottle.box}
      color={bottle.color}
      deleted={bottle.deleted}
    />
  );
};

type RawProps = { wineId: number };

type Props = { bottles: PropsFromRedux['bottles'] };

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
