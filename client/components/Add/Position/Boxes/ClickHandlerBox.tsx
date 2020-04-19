import { connect } from 'react-redux';
import {
  isBoxSelected,
  isBoxSelectable,
  selectBox,
  unselectBox
} from '~/client/store';
import CellarBox from '~/client/components/Cellar/CellarBox';
import CellarBoxSelectable from '~/client/components/Cellar/CellarBoxSelectable';

const SelectableBox = connect(
  null,
  dispatch => ({
    onSelect: boxId => {
      dispatch(selectBox(boxId));
    }
  })
)(CellarBoxSelectable);

const UnSelectableBox = connect(
  null,
  dispatch => ({
    onSelect: boxId => {
      dispatch(unselectBox(boxId));
    }
  })
)(CellarBoxSelectable);

const ClickHandlerBox = ({
  isBoxSelected,
  isBoxSelectable,
  boxId
}: {
  isBoxSelected: boolean,
  isBoxSelectable: boolean,
  boxId: number
}) => {
  if (isBoxSelected) {
    return <UnSelectableBox boxId={boxId} />;
  } else if (isBoxSelectable) {
    return <SelectableBox boxId={boxId} />;
  }
  return <CellarBox boxId={boxId} />;
};

export default connect((state, { boxId }) => {
  return {
    isBoxSelected: isBoxSelected(state, boxId),
    isBoxSelectable: isBoxSelectable(state, boxId)
  };
})(ClickHandlerBox);