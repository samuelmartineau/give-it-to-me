// @flow
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions
} from '~/client/components/Modal';
import SearchFiltersModalFilters from './SearchFiltersModalFilters';
import { Button } from '~/client/components/Toolkit';

type Props = {
  modalIsOpen: boolean,
  closeModal: Function,
  wineId: number
};

class SearchFiltersModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Filtres</ModalHeader>
        <ModalContent>
          <SearchFiltersModalFilters />
        </ModalContent>
        <ModalActions>
          <Button onClick={closeModal} type="button">
            Fermer
          </Button>
        </ModalActions>
      </Modal>
    );
  }
}

export default SearchFiltersModal;
