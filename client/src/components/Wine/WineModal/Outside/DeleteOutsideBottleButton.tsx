import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@/components/Toolkit';

import { removeOutsideBottles, RootState } from '@/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type Props = PropsFromRedux;

const DeleteOutsideBottleButton: FC<Props> = ({ count, onRemove }) => {
  return (
    <Button onClick={onRemove} primary type="button">
      Supprimer {count} bouteille{count > 1 && 's'}
    </Button>
  );
};

const connector = connect(
  ({ remove }: RootState) => ({
    count: remove.count,
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    onRemove() {
      dispatch(removeOutsideBottles());
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteOutsideBottleButton);
