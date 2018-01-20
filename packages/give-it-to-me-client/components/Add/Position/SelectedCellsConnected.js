import { connect } from 'react-redux';
import { compose } from 'recompose';
import SelectedCells from './SelectedCells';

export default compose(
  connect(state => {
    return { selectedCells: [] };
  })
)(SelectedCells);
