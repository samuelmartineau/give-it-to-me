import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '~/client/components/Toolkit';

import { removeBottles, RootState } from '~/client/store';

type Props = PropsFromRedux;

const DeleteInBoxesBottleButton: FC<Props> = ({ count, onRemove }) => {
  return (
    <Button onClick={onRemove} disabled={count === 0} primary type="button">
      Supprimer {count} bouteille{count > 1 && 's'}
    </Button>
  );
};

const connector = connect(
  ({ remove }: RootState) => ({
    count: remove.bottleIds.length,
  }),
  (dispatch) => ({
    onRemove() {
      dispatch(removeBottles());
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteInBoxesBottleButton);
