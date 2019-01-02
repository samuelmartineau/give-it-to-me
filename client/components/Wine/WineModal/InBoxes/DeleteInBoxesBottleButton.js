// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '~/client/components/Toolkit';

import { removeBottles } from '~/client/store';

type Props = {
  count: number,
  onRemove: Function
};

const DeleteInBoxesBottleButton = ({ count, onRemove }: Props) => {
  return (
    <Button onClick={onRemove} disabled={count === 0} primary type="button">
      Supprimer {count} bouteille{count > 1 && 's'}
    </Button>
  );
};

export default connect(
  ({ remove }) => ({
    count: remove.bottleIds.length
  }),
  dispatch => ({
    onRemove() {
      dispatch(removeBottles());
    }
  })
)(DeleteInBoxesBottleButton);
