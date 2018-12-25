// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import WineModalFolders from './WineModalFolders';
import WineModalDeleteButton from './WineModalDeleteButton';
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
  wineId: number
};

class WineModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal, wineId } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Suppression de bouteille</ModalHeader>
        <ModalContent>
          <WineModalFolders wineId={wineId} />
        </ModalContent>
        <ModalActions>
          <Actions>
            <Button onClick={closeModal} type="button">
              Annuler
            </Button>
            <WineModalDeleteButton />
          </Actions>
        </ModalActions>
      </Modal>
    );
  }
}

export default WineModal;