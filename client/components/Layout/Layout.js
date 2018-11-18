// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  * {
    box-sizing: border-box;
  } 
`;

type AppFrameProps = {
  width: Number,
  classes: {},
  title: string,
  children: React.Node
};

const App = styled.div``;
const PageTitle = styled.h1`
  text-align: center;
`;
const Main = styled.div`
  ${props => props.theme.media.screen`
    margin-left: auto;
    margin-right: auto;
    max-width: 1260px;
  `};
  ${props => props.theme.media.handheld`
    margin: 1em;
  `};
`;

const Layout = ({ title, children }: AppFrameProps) => {
  return (
    <App>
      <Header />
      <GlobalStyle />
      <PageTitle>{title}</PageTitle>
      <Main>{children}</Main>
    </App>
  );
};

export default Layout;
