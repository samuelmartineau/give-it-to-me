import { connect } from 'react-redux';
import {
  isBoxSelected,
  isBoxSelectable,
  selectBox,
  unselectBox
} from '../../../../store';
import CellarBox from '../../../Cellar/CellarBox';
import CellarBoxSelectable from '../../../Cellar/CellarBoxSelectable';

const SelectBox = connect(
  () => {},
  dispatch => ({
    onSelect: boxId => {
      dispatch(selectBox(boxId));
    }
  })
)(CellarBoxSelectable);

const UnSelectBox = connect(
  () => {},
  dispatch => ({
    onSelect: boxId => {
      dispatch(unselectBox(boxId));
    }
  })
)(CellarBoxSelectable);

const SelectableBoxSwitch = ({ isBoxSelected, isBoxSelectable, boxId }) => {
  console.log('switch', boxId, isBoxSelected, isBoxSelectable);
  if (isBoxSelected) {
    return <UnSelectBox boxId={boxId} />;
  } else if (isBoxSelectable) {
    return <SelectBox boxId={boxId} />;
  }
  return <CellarBox boxId={boxId} />;
};

const SwitchBox = connect((state, { boxId }) => {
  return {
    isBoxSelected: isBoxSelected(state, boxId),
    isBoxSelectable: isBoxSelectable(state, boxId)
  };
})(SelectableBoxSwitch);

export default SwitchBox;
