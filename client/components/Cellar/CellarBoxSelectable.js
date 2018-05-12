// @flow
import React from 'react';
import { compose, withProps } from 'recompose';
import CellarBox from './CellarBox';

const styles = () => ({
  boxClickable: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#7098d6'
    }
  }
});

export default compose(
  withProps(({ onSelect, boxId }) => ({
    onSelect: () => onSelect(boxId)
  }))
)(CellarBox);
