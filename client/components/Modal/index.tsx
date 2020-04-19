import React from 'react';
import ReactModal from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';

type Props = {
  isOpen: boolean;
  onRequestClose: Function;
  children: React.Node;
};

function ReactModalAdapter({ className, modalClassName, ...props }) {
  return (
    <ReactModal
      ariaHideApp={false}
      className={modalClassName}
      portalClassName={className}
      {...props}
    />
  );
}

const GlobalStyle = createGlobalStyle`
  .ReactModal__Body--open {
    overflow: hidden;
  }
`;

const StyledModal = styled(ReactModalAdapter).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Modal',
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
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .Modal {
    background: white;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    max-width: 800px;
    display: flex;
    flex-direction: column;
  }
`;

export const ModalHeader = styled.div`
  font-size: 21px;
  margin: 1rem;
  text-align: center;
`;
export const ModalContent = styled.div`
  margin: 1rem;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
export const ModalActions = styled.div`
  margin: 1rem;
`;

export class Modal extends React.PureComponent<Props> {
  render() {
    const { isOpen, onRequestClose, children } = this.props;
    return (
      <React.Fragment>
        <GlobalStyle />
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
          {children}
        </StyledModal>
      </React.Fragment>
    );
  }
}
