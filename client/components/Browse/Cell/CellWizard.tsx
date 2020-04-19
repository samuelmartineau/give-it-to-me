import React from 'react';
import tinycolor from 'tinycolor2';
import { connect } from 'react-redux';
import Bottle from '~/client/components/Cellar/Bottle';
import { getBottleByPosition } from '~/client/store';
import { getBottleInfos, getBottleId } from '~/client/components/Cellar/utils';

type Props = {
  bottle: any;
  isSelected: boolean;
  isSelectable: boolean;
  boxId: number;
  cellId: number;
};

const CellWizard = ({
  bottle,
  isSelected,
  isSelectable,
  boxId,
  cellId,
}: Props) => {
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

export default connect((state, { boxId, cellId, selectedCell }) => {
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
})(CellWizard);
