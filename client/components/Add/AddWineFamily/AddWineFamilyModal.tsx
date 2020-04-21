import React, { FC, useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { TextField, Button } from '~/client/components/Toolkit';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '~/client/components/Modal';
import { createWineFamily } from '~/client/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

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

type Props = PropsFromRedux & {
  modalIsOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const AddWineFamilyModal: FC<Props> = ({
  onSubmit,
  modalIsOpen,
  closeModal,
}) => {
  const [wineFamily, setWineFamily] = useState('');

  const inputEl = useRef<HTMLInputElement>(null);

  const onChange = (evt) => {
    const { value } = evt.target;
    setWineFamily(value);
  };

  const submit = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    await onSubmit(wineFamily);
    setWineFamily('');
    inputEl.current.value = '';
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <ModalHeader>Ajouter une appellation</ModalHeader>
      <ModalContent>
        <form onSubmit={submit}>
          <Label>
            <Text>Appellation</Text>
            <TextField
              ref={inputEl}
              name="source"
              type="text"
              placeholder="ex: Gaillac"
              onChange={onChange}
            />
          </Label>
        </form>
      </ModalContent>
      <ModalActions>
        <Actions>
          <Button onClick={closeModal} type="button">
            Annuler
          </Button>
          <Button
            disabled={wineFamily.length === 0}
            primary
            onClick={submit}
            type="button"
          >
            Ajouter
          </Button>
        </Actions>
      </ModalActions>
    </Modal>
  );
};

const connector = connect(
  null,
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    onSubmit(name) {
      return dispatch(createWineFamily(name));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddWineFamilyModal);
