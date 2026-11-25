import React, { FC } from 'react';
import ReactModal from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';

type ReactModalAdapterProps = {
  isOpen: boolean;
  onRequestClose: Function;
  className?: string;
  modalClassName?: string;
};

const ReactModalAdapter: FC<
  React.PropsWithChildren<ReactModalAdapterProps>
> = ({ className, modalClassName, ...props }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className={modalClassName}
      portalClassName={className}
      {...props}
    />
  );
};

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
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    max-width: 800px;
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.size.radius};
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    outline: none;
    overflow: hidden;

    @media (max-width: 600px) {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  font-size: 1.4rem;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
export const ModalContent = styled.div`
  padding: 24px;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  & > button {
    min-width: 140px;
  }
`;

type ModalProps = {
  isOpen: boolean;
  onRequestClose: Function;
};

export const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <>
      <GlobalStyle />
      <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
        {children}
      </StyledModal>
    </>
  );
};
