import { connect } from 'react-redux';
import {
  isCellSelected,
  isCellSelectable,
  selectCell,
  unselectCell
} from '~/client/store';
import BoxCell from '~/client/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '~/client/components/Cellar/Box/BoxCellSelectable';

const SelectableCell = connect(
  null,
  (dispatch, { boxId, cellId }) => ({
    onSelect: () => {
      dispatch(selectCell(boxId, cellId));
    }
  })
)(BoxCellSelectable);

const UnSelectableCell = connect(
  null,
  (dispatch, { boxId, cellId }) => ({
    onSelect: () => {
      dispatch(unselectCell(boxId, cellId));
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

export default connect((state, { boxId, cellId }) => {
  return {
    isCellSelected: isCellSelected(state, boxId, cellId),
    isCellSelectable: isCellSelectable(state, boxId, cellId)
  };
})(ClickHandlerCell);
