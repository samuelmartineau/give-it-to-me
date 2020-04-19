import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectBottleToDelete, unselectBottleToDelete } from '~/client/store';
import BoxCell from '~/client/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '~/client/components/Cellar/Box/BoxCellSelectable';

type RawProps = {
  bottleId: number;
};

const connectorSelectable = connect(
  null,
  (dispatch, { bottleId }: RawProps) => ({
    onSelect: () => {
      dispatch(selectBottleToDelete(bottleId));
    },
  })
);

const SelectableCell = connectorSelectable(BoxCellSelectable);

const connectorUnselectable = connect(
  null,
  (dispatch, { bottleId }: RawProps) => ({
    onSelect: () => {
      dispatch(unselectBottleToDelete(bottleId));
    },
  })
);

const UnSelectableCell = connectorUnselectable(BoxCellSelectable);

type CellProps = {
  boxId: number;
  cellId: number;
  isCellSelected: boolean;
  isCellSelectable: boolean;
  bottleId?: number;
};

const ClickHandlerCell: FC<CellProps> = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId,
  bottleId,
}) => {
  if (isCellSelected) {
    return (
      <UnSelectableCell bottleId={bottleId} boxId={boxId} cellId={cellId} />
    );
  } else if (isCellSelectable) {
    return <SelectableCell bottleId={bottleId} boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell cellId={cellId} />;
};

export default ClickHandlerCell;
