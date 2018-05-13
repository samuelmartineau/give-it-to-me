import { WineCard } from './WineCard';
import { connect } from 'react-redux';
import { getWineById } from '../../store';

export const WineCardConnected = connect((state, { wineId }) => ({
  wine: getWineById(state, wineId)
}))(WineCard);
