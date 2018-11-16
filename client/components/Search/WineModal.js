// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';

type Props = {
  modalIsOpen: boolean,
  closeModal: Function
};

function ReactModalAdapter({ className, modalClassName, ...props }) {
  return (
    <Modal className={modalClassName} portalClassName={className} {...props} />
  );
}

const GlobalStyle = createGlobalStyle`
  .ReactModal__Body--open {
    overflow: hidden;
  }
`;

const StyledModal = styled(ReactModalAdapter).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Modal'
})`
  .Overlay {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .Modal {
    background: white;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    max-width: 800px;
  }
`;

class WineModal extends React.PureComponent<Props> {
  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <React.Fragment>
        <GlobalStyle />
        <StyledModal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </StyledModal>
      </React.Fragment>
    );
  }
}

export default WineModal;
