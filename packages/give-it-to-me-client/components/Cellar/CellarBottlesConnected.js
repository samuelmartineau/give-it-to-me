import CellarBottles from './CellarBottles';
import { connect } from 'react-redux';
import { compose } from 'recompose';

export default compose(
  connect(state => ({
    bottles: state.bottles.all
  }))
)(CellarBottles);
