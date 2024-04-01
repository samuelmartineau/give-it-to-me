import React, { FC, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '~/client/components/Toolkit';
import AddWineFamilyModal from './AddWineFamilyModal';

const ButtonStyled = styled(Button)`
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;

  & > svg {
    font-size: 15px;
  }
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
      <ButtonStyled type="button" onClick={openModal} name="addWineFamily">
        <AddIcon />
      </ButtonStyled>
      <AddWineFamilyModal modalIsOpen={modalOpen} closeModal={closeModal} />
    </>
  );
};
