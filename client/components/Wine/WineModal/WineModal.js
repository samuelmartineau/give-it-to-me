// @flow
import React from 'react';
import { Button } from '~/client/components/Toolkit';
import WineModalFolders from './WineModalFolders';
import WineModalDeleteButton from './WineModalDeleteButton';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions
} from '~/client/components/Modal';

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
          <Button onClick={closeModal} type="button">
            Annuler
          </Button>
          <WineModalDeleteButton />
        </ModalActions>
      </Modal>
    );
  }
}

export default WineModal;
