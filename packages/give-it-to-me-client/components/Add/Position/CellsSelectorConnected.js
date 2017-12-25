import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getSelectedBoxes } from '../../../store';
import CellsSelector from './CellsSelector';

export default compose(
  connect(state => ({
    selectedBoxes: getSelectedBoxes(state)
  }))
)(CellsSelector);
