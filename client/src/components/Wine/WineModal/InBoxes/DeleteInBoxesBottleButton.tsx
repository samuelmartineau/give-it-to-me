import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@/components/Toolkit';

import { removeBottles, RootState } from '@/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getCellar } from '@/store/wines/wines.actions';

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
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    async onRemove() {
      await dispatch(removeBottles());
      await dispatch(getCellar());
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteInBoxesBottleButton);
