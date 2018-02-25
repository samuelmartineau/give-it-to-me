import { connect } from 'react-redux';
import {
  isCellSelected,
  isCellSelectable,
  selectCell,
  unselectCell
} from '../../../../store';
import BoxCell from '../../../Cellar/Box/BoxCell';
import BoxCellSelectable from '../../../Cellar/Box/BoxCellSelectable';

const SelectCell = connect(null, dispatch => ({
  onSelect: boxId => {
    dispatch(selectCell(boxId));
  }
}))(BoxCellSelectable);

const UnSelectCell = connect(null, dispatch => ({
  onSelect: boxId => {
    dispatch(unselectCell(boxId));
  }
}))(BoxCellSelectable);

const SelectableBoxSwitch = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId
}) => {
  if (isCellSelected) {
    return <UnSelectCell boxId={boxId} />;
  } else if (isCellSelectable) {
    return <SelectCell boxId={boxId} />;
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
