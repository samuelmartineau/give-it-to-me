import { connect } from 'react-redux';
import { selectBottleToDelete, unselectBottleToDelete } from '~/client/store';
import BoxCell from '~/client/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '~/client/components/Cellar/Box/BoxCellSelectable';

const SelectableCell = connect(
  null,
  (dispatch, { bottleId }) => ({
    onSelect: () => {
      dispatch(selectBottleToDelete(bottleId));
    }
  })
)(BoxCellSelectable);

const UnSelectableCell = connect(
  null,
  (dispatch, { bottleId }) => ({
    onSelect: () => {
      dispatch(unselectBottleToDelete(bottleId));
    }
  })
)(BoxCellSelectable);

type CellProps = {
  boxId: number,
  cellId: number,
  isCellSelected: boolean,
  isCellSelectable: boolean
};

const ClickHandlerCell = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId,
  bottleId
}: CellProps) => {
  if (isCellSelected) {
    return (
      <UnSelectableCell bottleId={bottleId} boxId={boxId} cellId={cellId} />
    );
  } else if (isCellSelectable) {
    return <SelectableCell bottleId={bottleId} boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell boxId={boxId} cellId={cellId} />;
};

export default ClickHandlerCell;
