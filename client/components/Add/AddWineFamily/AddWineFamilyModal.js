// @flow
import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '~/client/components/Toolkit';
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

const Text = styled.span`
  font-style: italic;
  display: block;
`;

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;

type Props = {
  modalIsOpen: boolean,
  closeModal: Function,
  wineId: number
};

export class AddWineFamilyModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Ajouter une appellation</ModalHeader>
        <ModalContent>
          <form>
            <Label>
              <Text>Provenance</Text>
              <TextField
                name="source"
                // value={this.props.model.source}
                type="text"
                placeholder="France"
                //onChange={this.props.onMetaChange}
              />
            </Label>
          </form>
        </ModalContent>
        <ModalActions>
          <Actions>
            <Button onClick={closeModal} type="button">
              Annuler
            </Button>
            {/* <WineModalDeleteButton /> */}
          </Actions>
        </ModalActions>
      </Modal>
    );
  }
}
