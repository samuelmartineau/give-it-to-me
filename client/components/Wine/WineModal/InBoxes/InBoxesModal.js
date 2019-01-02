// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import WineFolders from './WineFolders';
import DeleteInBoxesBottleButton from './DeleteInBoxesBottleButton';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions
} from '~/client/components/Modal';

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
`;
type Props = {
  modalIsOpen: boolean,
  closeModal: Function,
  wineId: number,
  wine: {}
};

class InBoxesModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal, wine } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Suppression de bouteille</ModalHeader>
        <ModalContent>
          <WineFolders wine={wine} />
        </ModalContent>
        <ModalActions>
          <Actions>
            <Button onClick={closeModal} type="button">
              Fermer
            </Button>
            <DeleteInBoxesBottleButton />
          </Actions>
        </ModalActions>
      </Modal>
    );
  }
}

export default InBoxesModal;
