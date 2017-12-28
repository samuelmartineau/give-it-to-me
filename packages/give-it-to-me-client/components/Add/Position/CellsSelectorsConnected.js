import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getSelectedBoxes } from '../../../store';
import CellsSelectors from './CellsSelectors';

export default compose(
  connect(state => ({
    selectedBoxes: getSelectedBoxes(state)
  }))
)(CellsSelectors);
