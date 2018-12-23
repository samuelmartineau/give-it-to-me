import { connect } from 'react-redux';
import { isBoxSelected, unselectBox } from '~/client/store';
import CellsSelector from './CellsSelector';

export default connect(
  (state, { boxId }) => ({
    isBoxSelected: isBoxSelected(state, boxId)
  }),
  (dispatch, { boxId }) => ({
    onUnselect: () => dispatch(unselectBox(boxId))
  })
)(CellsSelector);
