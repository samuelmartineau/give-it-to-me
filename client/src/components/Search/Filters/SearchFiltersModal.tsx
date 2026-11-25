import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/CloseRounded';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/Modal';
import SearchFiltersModalFilters from './SearchFiltersModalFilters';
import { Button } from '@/components/Toolkit';
import { getWinesFiltered, getFiltersCount, RootState } from '@/store/';
import { SearchParams } from '@/routes/search';

const Header = styled(ModalHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-right: 12px;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  & svg {
    font-size: 1.8rem;
  }
`;

const Actions = styled(ModalActions)`
  justify-content: space-between;

  & > button {
    flex: 1;
  }
`;

type Props = PropsFromRedux & {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const SearchFiltersModal: FC<Props> = ({
  modalIsOpen,
  closeModal,
  count,
  filtersCount,
}) => {
  const navigate = useNavigate({ from: '/search' });

  // Keep the name typed in the page's search box, clear everything else.
  const clearFilters = () => {
    navigate({
      search: (prev: SearchParams) => ({ name: prev.name }),
      replace: true,
    });
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <Header>
        Filtres
        <CloseButton type="button" onClick={closeModal} aria-label="Fermer">
          <CloseIcon />
        </CloseButton>
      </Header>
      <ModalContent>
        <SearchFiltersModalFilters />
      </ModalContent>
      <Actions>
        <Button
          type="button"
          variant="ghost"
          onClick={clearFilters}
          disabled={filtersCount === 0}
        >
          Tout effacer
        </Button>
        <Button onClick={closeModal} type="button" primary>
          {count === 0
            ? 'Aucun vin'
            : `Voir ${count} vin${count > 1 ? 's' : ''}`}
        </Button>
      </Actions>
    </Modal>
  );
};

const connector = connect((state: RootState) => ({
  count: getWinesFiltered(state).length,
  filtersCount: getFiltersCount(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchFiltersModal);
