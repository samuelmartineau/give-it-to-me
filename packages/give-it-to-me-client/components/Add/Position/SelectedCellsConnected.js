import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getSelectedCells } from '../../../store';
import SelectedCells from './SelectedCells';

export default compose(
  connect(state => {
    return { selectedCells: getSelectedCells(state) };
  })
)(SelectedCells);
