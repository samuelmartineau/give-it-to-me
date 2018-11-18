// @flow
import { getBoxCells } from '../utils';

type Props = {
  boxId: number,
  children: Function
};

const BoxCells = ({ boxId, children = () => {} }: Props) => {
  const cells = getBoxCells(boxId);
  return cells.map(cellId => children(cellId));
};

export default BoxCells;
