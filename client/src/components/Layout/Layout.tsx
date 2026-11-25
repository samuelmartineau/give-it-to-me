import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 18px;
    -webkit-text-size-adjust: 100%;
  }
  @media (max-width: 600px) {
    html {
      font-size: 17px;
    }
  }
  body {
    margin: 0;
    font-family: 'Atkinson Hyperlegible', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }
  * {
    box-sizing: border-box;
  }
  button, input, select, textarea {
    font: inherit;
  }
  h1, h2, h3 {
    line-height: 1.2;
  }
  a {
    color: ${({ theme }) => theme.colors.secondary};
  }
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 24px;
  font-size: 2.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};

  ${({ theme }) => theme.media.handheld`
    font-size: 1.6rem;
    margin-bottom: 16px;
  `};
`;

const Main = styled.main`
  max-width: ${({ theme }) => theme.size.maxWidth};
  margin: 0 auto;
  padding: 32px 32px 64px;

  ${({ theme }) => theme.media.handheld`
    padding: 20px 12px 48px;
  `};
`;

type Props = {
  title: string;
};

export const Layout: FC<React.PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <PageTitle>{title}</PageTitle>
        {children}
      </Main>
    </>
  );
};
