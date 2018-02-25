import { connect } from 'react-redux';
import { isBoxSelected } from '../../../../store';
import CellsSelector from './CellsSelector';

export default connect((state, { boxId }) => ({
  isBoxSelected: isBoxSelected(state, boxId)
}))(CellsSelector);
