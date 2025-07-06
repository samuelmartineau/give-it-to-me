import { connect } from 'react-redux';
import { selectBottleToDelete, unselectBottleToDelete } from '@/store';
import BoxCellSelectable from '@/components/Cellar/Box/BoxCellSelectable';

type RawProps = {
  bottleId: number;
};

const connectorSelectable = connect(
  null,
  (dispatch, { bottleId }: RawProps) => ({
    onSelect: () => {
      dispatch(selectBottleToDelete(bottleId));
    },
  }),
);

export const SelectableCell = connectorSelectable(BoxCellSelectable);

const connectorUnselectable = connect(
  null,
  (dispatch, { bottleId }: RawProps) => ({
    onSelect: () => {
      dispatch(unselectBottleToDelete(bottleId));
    },
  }),
);

export const UnSelectableCell = connectorUnselectable(BoxCellSelectable);
