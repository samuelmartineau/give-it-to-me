import React, { FC, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@/components/Toolkit';
import AddWineFamilyModal from './AddWineFamilyModal';

const ButtonStyled = styled(Button)`
  margin-top: -8px;
`;

export const AddWineFamilyButton: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ButtonStyled
        type="button"
        variant="ghost"
        onClick={openModal}
        name="addWineFamily"
      >
        <AddIcon />
        Nouvelle appellation
      </ButtonStyled>
      <AddWineFamilyModal modalIsOpen={modalOpen} closeModal={closeModal} />
    </>
  );
};
