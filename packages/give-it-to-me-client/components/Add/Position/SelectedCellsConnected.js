import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getSelectedCells, selectBox } from '../../../store';
import SelectedCells from './SelectedCells';

export default compose(
  connect(state => ({
    selectedCells: getSelectedCells(state)
  }))
)(SelectedCells);
