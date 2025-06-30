import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import RemoveOutsideBottleForm from './RemoveOutsideBottleForm';
import DeleteOutsideBottleButton from './DeleteOutsideBottleButton';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '~/client/components/Modal';
import { WineEnhanced } from '~/client/Cellar.type';

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
`;
type Props = {
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  wine: WineEnhanced;
};

class OutsideModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal, wine } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Suppression de bouteille (hors casier)</ModalHeader>
        <ModalContent>
          <RemoveOutsideBottleForm wine={wine} />
        </ModalContent>
        <ModalActions>
          <Actions>
            <Button onClick={closeModal} type="button">
              Fermer
            </Button>
            <DeleteOutsideBottleButton />
          </Actions>
        </ModalActions>
      </Modal>
    );
  }
}

export default OutsideModal;
