// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { cellar } from '~/config';
import classNames from 'classnames';

const { CELLAR_SCHEMA, BOX_BORDER_SIZE, BOX_BORDER_COLOR, BOX_COLOR } = cellar;

type Props = {
  boxId: number,
  onSelect?: Function
};

const CellarBox = ({ boxId, onSelect, classes = {} }: Props) => {
  const box = CELLAR_SCHEMA[boxId];
  return (
    <rect
      className={classNames(Object.values(classes))}
      onClick={onSelect}
      x={box.x}
      y={box.y}
      width={box.width}
      height={box.height}
      strokeWidth={BOX_BORDER_SIZE}
      stroke={BOX_BORDER_COLOR}
      fill={BOX_COLOR}
    />
  );
};

export default CellarBox;
