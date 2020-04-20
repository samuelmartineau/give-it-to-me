import React from 'react';
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
  closeModal: Function;
  wineId: number;
};

class AddWineFamilyModal extends React.PureComponent<Props> {
  state = {
    value: '',
  };
  onChange = (evt) => {
    const { value } = evt.target;
    this.setState({ value });
  };
  submit = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const { onSubmit } = this.props;
    const { value } = this.state;
    await onSubmit(value);
    this.setState({ value: '' });
    this.input.value = '';
  };

  render() {
    const { modalIsOpen, closeModal } = this.props;
    const { value } = this.state;
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ModalHeader>Ajouter une appellation</ModalHeader>
        <ModalContent>
          <form onSubmit={this.submit}>
            <Label>
              <Text>Appellation</Text>
              <TextField
                ref={(el) => {
                  this.input = el;
                }}
                name="source"
                type="text"
                placeholder="ex: Gaillac"
                onChange={this.onChange}
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
              disabled={value.length === 0}
              primary
              onClick={this.submit}
              type="button"
            >
              Ajouter
            </Button>
          </Actions>
        </ModalActions>
      </Modal>
    );
  }
}

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
