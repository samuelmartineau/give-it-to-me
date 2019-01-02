// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '~/client/components/Toolkit';

import { removeOutsideBottles } from '~/client/store';

type Props = {
  count: number,
  onRemove: Function
};

const DeleteOutsideBottleButton = ({ count, onRemove }: Props) => {
  return (
    <Button onClick={onRemove} primary type="button">
      Supprimer {count} bouteille{count > 1 && 's'}
    </Button>
  );
};

export default connect(
  ({ remove }) => ({
    count: remove.count
  }),
  dispatch => ({
    onRemove() {
      dispatch(removeOutsideBottles());
    }
  })
)(DeleteOutsideBottleButton);
