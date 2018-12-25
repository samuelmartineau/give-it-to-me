// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import AddWineFamilyModal from './AddWineFamilyModal';

type Props = {
  wineId: number
};
type State = {
  modalIsOpen: boolean
};

const ButtonStyled = styled(Button)`
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;

  & > i {
    font-size: 15px;
  }
`;

export class AddWineFamilyButton extends React.PureComponent<Props, State> {
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
    const { modalIsOpen } = this.state;
    return (
      <>
        <ButtonStyled type="button" onClick={this.openModal}>
          <i className="material-icons">add</i>
        </ButtonStyled>
        <AddWineFamilyModal
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}
