import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getSelectedCells, selectBox } from '../../../store';
import BoxesSelector from './BoxesSelector';

export default compose(
  connect(
    state => ({
      selectedBottles: getSelectedCells(state),
      bottles: state.bottles.all
    }),
    dispatch => ({
      onSelect: boxId => {
        dispatch(selectBox(boxId));
      }
    })
  )
)(BoxesSelector);
