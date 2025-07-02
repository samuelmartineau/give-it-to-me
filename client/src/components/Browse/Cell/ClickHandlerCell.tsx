import { FC } from 'react';
import { connect } from 'react-redux';
import { selectCellToBrowse, unselectCellToBrowse } from '@/store';
import BoxCell from '@/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '@/components/Cellar/Box/BoxCellSelectable';

type RawProps = {
  cellId: number;
};

const SelectableCell = connect(null, (dispatch, { cellId }: RawProps) => ({
  onSelect: () => {
    dispatch(selectCellToBrowse(cellId));
  },
}))(BoxCellSelectable);

const UnSelectableCell = connect(null, (dispatch, { cellId }: RawProps) => ({
  onSelect: () => {
    dispatch(unselectCellToBrowse(cellId));
  },
}))(BoxCellSelectable);

type Props = {
  boxId: number;
  cellId: number;
  isCellSelected: boolean;
  isCellSelectable: boolean;
};

const ClickHandlerCell: FC<Props> = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId,
}) => {
  if (isCellSelected) {
    return <UnSelectableCell boxId={boxId} cellId={cellId} />;
  } else if (isCellSelectable) {
    return <SelectableCell boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell cellId={cellId} />;
};

export default ClickHandlerCell;
