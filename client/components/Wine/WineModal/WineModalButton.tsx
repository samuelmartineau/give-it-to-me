import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '~/client/components/Toolkit';
import {
  resetRemoveState,
  getWineById,
  selectWineToRemove,
  RootState,
} from '~/client/store';
import InBoxesModal from './InBoxes/InBoxesModal';
import OutsideModal from './Outside/OutsideModal';

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type RawProps = {
  wineId: number;
};

type Props = RawProps & PropsFromRedux;

type State = {
  modalIsOpen: boolean;
};

class WineModalButton extends React.PureComponent<Props, State> {
  state = {
    modalIsOpen: false,
  };

  closeModal = () => {
    const { onClose } = this.props;
    onClose();
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    const { wine, openOutsideModal } = this.props;
    if (!wine.isInBoxes) {
      openOutsideModal();
    }
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { wine } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <>
        <ButtonStyled type="button" onClick={this.openModal}>
          Bouteilles
        </ButtonStyled>
        {!!wine.isInBoxes && (
          <InBoxesModal
            wine={wine}
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
          />
        )}
        {!wine.isInBoxes && (
          <OutsideModal
            wine={wine}
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

const connector = connect(
  (state: RootState, { wineId }: RawProps) => ({
    wine: getWineById(state, wineId),
  }),
  (dispatch, { wineId }: RawProps) => ({
    onClose() {
      dispatch(resetRemoveState());
    },
    openOutsideModal() {
      dispatch(selectWineToRemove(wineId));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineModalButton);
