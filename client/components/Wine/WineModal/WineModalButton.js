// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from '~/client/components/Toolkit';
import {
  resetRemoveState,
  getWineById,
  selectWineToRemove
} from '~/client/store';
import InBoxesModal from './InBoxes/InBoxesModal';
import OutsideModal from './Outside/OutsideModal';
import type { WineType } from '~/client/components/Wine/Wine.type';

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  wine: WineType,
  onClose: Function,
  openOutsideModal: Function
};
type State = {
  modalIsOpen: boolean
};

class WineModalButton extends React.PureComponent<Props, State> {
  state = {
    modalIsOpen: false
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

export default connect(
  (state, { wineId }) => ({
    wine: getWineById(state, wineId)
  }),
  (dispatch, { wineId }) => ({
    onClose() {
      dispatch(resetRemoveState());
    },
    openOutsideModal() {
      dispatch(selectWineToRemove(wineId));
    }
  })
)(WineModalButton);
