import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '~/client/components/Modal';
import SearchFiltersModalFilters from './SearchFiltersModalFilters';
import { Button } from '~/client/components/Toolkit';
import { getWinesFiltered, getFiltersCount, RootState } from '~/client/store/';

type Props = PropsFromRedux & {
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SearchFiltersModal: FC<Props> = ({
  modalIsOpen,
  closeModal,
  count,
  filtersCount,
}) => {
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
};

const connector = connect((state: RootState) => ({
  count: getWinesFiltered(state).length,
  filtersCount: getFiltersCount(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchFiltersModal);
