import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/Modal';
import SearchFiltersModalFilters from './SearchFiltersModalFilters';
import { Button } from '@/components/Toolkit';
import { getWinesFiltered, getFiltersCount, RootState } from '@/store/';

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
        Affiner la recherche
        {filtersCount > 0 &&
          ` (${filtersCount} filtre${filtersCount > 1 ? 's' : ''})`}
      </ModalHeader>
      <ModalContent>
        <SearchFiltersModalFilters />
      </ModalContent>
      <ModalActions>
        <Button onClick={closeModal} type="button" primary>
          Voir {count} résultat{count > 1 && 's'}
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
