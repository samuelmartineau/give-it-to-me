import React, { FC } from 'react';
import tinycolor from 'tinycolor2';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '@/components/Cellar/Bottle';
import { getBottleByPosition, RootState } from '@/store';
import { getBottleInfos, getBottleId } from '@/components/Cellar/utils';

type RawProps = {
  boxId: number;
  cellId: number;
  selectedCell: { boxId: number; cellId?: number };
};

type Props = PropsFromRedux & RawProps;

const CellWizard: FC<Props> = ({
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
  (state: RootState, { boxId, cellId, selectedCell }: RawProps) => {
    const bottle = getBottleByPosition(state, boxId, cellId);
    let isSelected =
      bottle &&
      bottle.box === selectedCell.boxId &&
      bottle.cell === selectedCell.cellId;

    return {
      bottle,
      isSelected,
      isSelectable: !!bottle && !isSelected,
    };
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellWizard);
