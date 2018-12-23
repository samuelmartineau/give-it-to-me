import { connect } from 'react-redux';
import { selectCellToBrowse, unselectCellToBrowse } from '~/client/store';
import BoxCell from '~/client/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '~/client/components/Cellar/Box/BoxCellSelectable';

const SelectableCell = connect(
  null,
  (dispatch, { cellId }) => ({
    onSelect: () => {
      dispatch(selectCellToBrowse(cellId));
    }
  })
)(BoxCellSelectable);

const UnSelectableCell = connect(
  null,
  (dispatch, { cellId }) => ({
    onSelect: () => {
      dispatch(unselectCellToBrowse(cellId));
    }
  })
)(BoxCellSelectable);

type CellProps = {
  boxId: number,
  cellId: number,
  isCellSelected: boolean,
  isCellSelectable: boolean
};

const ClickHandlerCell = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId
}: CellProps) => {
  if (isCellSelected) {
    return <UnSelectableCell boxId={boxId} cellId={cellId} />;
  } else if (isCellSelectable) {
    return <SelectableCell boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell boxId={boxId} cellId={cellId} />;
};

export default ClickHandlerCell;
