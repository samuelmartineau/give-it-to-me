import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  getSelectedCellsInBox,
  getBottlesInBox,
  selectBox
} from '../../../../store';
import CellarBoxSelectable from '../../../Cellar/CellarBoxSelectable';

export default compose(
  connect(
    (state, { boxId }) => {
      return {
        selectedBottles: getSelectedCellsInBox(state, boxId),
        bottles: getBottlesInBox(state, boxId)
      };
    },
    dispatch => ({
      onSelect: boxId => {
        dispatch(selectBox(boxId));
      }
    })
  )
)(CellarBoxSelectable);
