// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '~/client/components/Toolkit';

import { removeBottles } from '~/client/store';

const WineModalDeleteButton = ({
  isDisabled,
  onRemove
}: {
  isDisabled: boolean,
  onRemove: Function
}) => {
  return (
    <Button onClick={onRemove} disabled={isDisabled} primary type="button">
      Supprimer
    </Button>
  );
};

export default connect(
  ({ remove }) => ({
    isDisabled: remove.bottleIds.length === 0 || remove.count > 0
  }),
  dispatch => ({
    onRemove() {
      dispatch(removeBottles());
    }
  })
)(WineModalDeleteButton);
