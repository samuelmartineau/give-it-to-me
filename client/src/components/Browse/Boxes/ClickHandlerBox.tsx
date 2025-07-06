import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  isBoxBrowsed,
  isBoxBrowseable,
  selectBoxToBrowse,
  unselectBoxToBrowse,
  RootState,
} from '@/store';
import CellarBox from '@/components/Cellar/CellarBox';
import CellarBoxSelectable from '@/components/Cellar/CellarBoxSelectable';

const SelectableBox = connect(null, (dispatch) => ({
  onSelect: (boxId) => {
    dispatch(selectBoxToBrowse(boxId));
  },
}))(CellarBoxSelectable);

const UnSelectableBox = connect(null, (dispatch) => ({
  onSelect: (boxId) => {
    dispatch(unselectBoxToBrowse(boxId));
  },
}))(CellarBoxSelectable);

type RawProps = {
  boxId: number;
};

type Props = RawProps & PropsFromRedux;

const ClickHandlerBox: FC<Props> = ({
  isBoxSelected,
  isBoxSelectable,
  boxId,
}) => {
  if (isBoxSelected) {
    return <UnSelectableBox boxId={boxId} />;
  } else if (isBoxSelectable) {
    return <SelectableBox boxId={boxId} />;
  }
  return <CellarBox boxId={boxId} />;
};

const connector = connect((state: RootState, { boxId }: RawProps) => {
  return {
    isBoxSelected: isBoxBrowsed(state, boxId),
    isBoxSelectable: isBoxBrowseable(state, boxId),
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ClickHandlerBox);
