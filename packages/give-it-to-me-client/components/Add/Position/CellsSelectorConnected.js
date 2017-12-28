import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  getSelectedCellsInBox,
  getBottlesInBox,
  unselectBox
} from '../../../store';
import CellsSelector from './CellsSelector';

export default compose(
  connect(
    (state, { boxId }) => ({
      selectedCells: getSelectedCellsInBox(state, boxId),
      bottles: getBottlesInBox(state, boxId)
    }),
    (dispatch, { boxId }) => ({
      onUnselect() {
        dispatch(unselectBox(boxId));
      }
    })
  )
)(CellsSelector);
