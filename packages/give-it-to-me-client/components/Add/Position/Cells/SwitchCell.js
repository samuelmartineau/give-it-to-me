import { connect } from 'react-redux';
import {
  isCellSelected,
  isCellSelectable,
  selectCell,
  unselectCell
} from '../../../../store';
import BoxCell from '../../../Cellar/Box/BoxCell';
import BoxCellSelectable from '../../../Cellar/Box/BoxCellSelectable';

const SelectCell = connect(null, (dispatch, { boxId, cellId }) => ({
  onSelect: () => {
    dispatch(selectCell(boxId, cellId));
  }
}))(BoxCellSelectable);

const UnSelectCell = connect(null, (dispatch, { boxId, cellId }) => ({
  onSelect: () => {
    dispatch(unselectCell(boxId, cellId));
  }
}))(BoxCellSelectable);

type SelectableBoxSwitchProps = {
  boxId: number,
  cellId: number,
  isCellSelected: boolean,
  isCellSelectable: boolean
};

const SelectableBoxSwitch = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId
}: SelectableBoxSwitchProps) => {
  console.log(
    'isCellSelected',
    isCellSelected,
    'isCellSelectable',
    isCellSelectable
  );
  if (isCellSelected) {
    return <UnSelectCell boxId={boxId} cellId={cellId} />;
  } else if (isCellSelectable) {
    return <SelectCell boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell boxId={boxId} cellId={cellId} />;
};

const SwitchCell = connect((state, { boxId, cellId }) => {
  return {
    isCellSelected: isCellSelected(state, boxId, cellId),
    isCellSelectable: isCellSelectable(state, boxId, cellId)
  };
})(SelectableBoxSwitch);

export default SwitchCell;
