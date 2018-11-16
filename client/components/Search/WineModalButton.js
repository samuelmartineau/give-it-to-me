// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import WineModal from './WineModal';

type Props = {
  wine: {}
};
type State = {
  modalIsOpen: boolean
};

const Wrapper = styled.div`
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
    const { wine } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <Wrapper>
        <Button onClick={this.openModal}>Suppression de bouteille</Button>
        <WineModal modalIsOpen={modalIsOpen} closeModal={this.closeModal} />
      </Wrapper>
    );
  }
}

export default WineModalButton;
