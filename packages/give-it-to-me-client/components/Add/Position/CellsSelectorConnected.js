import { connect } from 'react-redux';
import {
  getSelectedCellsInBox,
  getBottlesInBox,
  unselectBox
} from '../../../store';
import CellsSelector from './CellsSelector';

export default connect(
  (state, { boxId }) => ({
    selectedCellsInBox: getSelectedCellsInBox(state, boxId),
    bottlesInBox: getBottlesInBox(state, boxId)
  }),
  (dispatch, { boxId }) => ({
    onUnselect() {
      dispatch(unselectBox(boxId));
    }
  })
)(CellsSelector);
