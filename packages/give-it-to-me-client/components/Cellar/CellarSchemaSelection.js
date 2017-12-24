import CellarSchema from './CellarSchema';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  boxClickable: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#7098d6'
    }
  }
});

export default compose(
  withStyles(styles),
  connect(state => ({
    bottles: state.bottles.all
  })),
  withProps({
    selectMode: true
  })
)(CellarSchema);
