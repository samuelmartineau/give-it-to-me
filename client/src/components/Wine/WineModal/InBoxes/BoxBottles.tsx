import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '@/components/Cellar/Bottle';
import BoxCells from '@/components/Cellar/Cells/BoxCells';
import {
  getBottleByPosition,
  isBottleSelectedToBeRemoved,
  RootState,
} from '@/store';
import {
  getCellId,
  getBottleInfos,
  getBottleId,
} from '@/components/Cellar/utils';

const BoxBottles: FC<{
  boxId: number;
  selectableBottleIds: Array<number>;
}> = ({ boxId, selectableBottleIds }) => {
  return (
    <g>
      <BoxCells boxId={boxId}>
        {(cellId) => {
          return (
            <CellConnected
              key={getCellId(boxId, cellId)}
              boxId={boxId}
              cellId={cellId}
              selectableBottleIds={selectableBottleIds}
            />
          );
        }}
      </BoxCells>
    </g>
  );
};

type RawProps = {
  selectableBottleIds: Array<number>;
  boxId: number;
  cellId: number;
};

type Props = PropsFromRedux & RawProps;

const Cell: FC<Props> = ({
  bottle,
  isSelected,
  isSelectable,
  boxId,
  cellId,
}) => {
  if (!bottle) {
    return null;
  }

  const bottleInfos = getBottleInfos(boxId, cellId);

  let color = bottle.color;
  if (isSelected) {
    color = 'blue';
  } else if (isSelectable) {
    color = bottle.color;
  } else {
    color = tinycolor(bottle.color).lighten(30).toString();
  }
  return (
    <Bottle
      key={getBottleId(boxId, cellId)}
      cx={bottleInfos.cxRelative}
      cy={bottleInfos.cyRelative}
      cell={cellId}
      box={boxId}
      color={color}
    />
  );
};

const connector = connect(
  (state: RootState, { boxId, cellId, selectableBottleIds }: RawProps) => {
    const bottle = getBottleByPosition(state, boxId, cellId);
    let isSelected = false;
    if (bottle) {
      isSelected = isBottleSelectedToBeRemoved(state, bottle.id);
    }
    return {
      bottle,
      isSelected,
      isSelectable: !!bottle && selectableBottleIds.includes(bottle.id),
    };
  }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CellConnected = connector(Cell);

export default BoxBottles;
