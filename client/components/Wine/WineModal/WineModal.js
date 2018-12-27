// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getWineById } from '~/client/store';
import { Button } from '~/client/components/Toolkit';
import WineModalFolders from './WineModalFolders';
import WineModalForm from './WineModalForm';
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
  wineId: number,
  wine: {}
};

class WineModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal, wine } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Suppression de bouteille</ModalHeader>
        <ModalContent>
          {!!wine.isInBoxes && <WineModalFolders wine={wine} />}
          {!wine.isInBoxes && <WineModalForm wine={wine} />}
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

export default connect((state, { wineId }) => ({
  wine: getWineById(state, wineId)
}))(WineModal);
