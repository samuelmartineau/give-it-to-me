// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions
} from '~/client/components/Modal';
import SearchFiltersModalFilters from './SearchFiltersModalFilters';
import { Button } from '~/client/components/Toolkit';
import { getWinesFiltered, getFiltersCount } from '~/client/store/';

type Props = {
  modalIsOpen: boolean,
  closeModal: Function,
  wineId: number,
  count: number,
  filtersCount: number
};

class SearchFiltersModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal, count, filtersCount } = this.props;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>
          {filtersCount} filtre{filtersCount > 1 && 's'} affiche
          {filtersCount > 1 && 'nt'} {count} résultat{count > 1 && 's'}
        </ModalHeader>
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

export default connect(state => ({
  count: getWinesFiltered(state).length,
  filtersCount: getFiltersCount(state)
}))(SearchFiltersModal);
