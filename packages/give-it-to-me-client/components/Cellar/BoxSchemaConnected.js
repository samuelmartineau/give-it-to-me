import { connect } from 'react-redux';
import { compose } from 'recompose';
import BoxSchema from './BoxSchema';
import { getBottlesInBox } from '../../store';

export default compose(
  connect((state, { boxId }) => ({
    bottles: getBottlesInBox(state, boxId)
  }))
)(BoxSchema);
