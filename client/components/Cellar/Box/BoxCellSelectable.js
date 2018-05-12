// @flow
import React from 'react';
import { compose, withProps } from 'recompose';
import BoxCell from './BoxCell';

const styles = () => ({
  boxClickable: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#7098d6'
    }
  }
});

export default compose(
  withProps(({ onSelect, boxId, cellId }) => ({
    onSelect: () => onSelect(boxId, cellId)
  }))
)(BoxCell);
