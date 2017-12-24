import WineCard from './WineCard';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getWineById } from '../../store';

export default compose(
  connect((state, { wineId }) => ({
    wine: getWineById(state, wineId)
  }))
)(WineCard);
