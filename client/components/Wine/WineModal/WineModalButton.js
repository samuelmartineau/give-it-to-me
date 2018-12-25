// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import WineModal from './WineModal';

type Props = {
  wineId: number
};
type State = {
  modalIsOpen: boolean
};

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class WineModalButton extends React.PureComponent<Props, State> {
  state = {
    modalIsOpen: false
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { wineId } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <>
        <ButtonStyled type="button" onClick={this.openModal}>
          Bouteilles
        </ButtonStyled>
        <WineModal
          wineId={wineId}
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}

export default WineModalButton;