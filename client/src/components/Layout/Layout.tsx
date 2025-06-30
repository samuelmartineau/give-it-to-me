import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-display: swap;
  }
  * {
    box-sizing: border-box;
  } 
`;

const App = styled.div``;
const PageTitle = styled.h1`
  text-align: center;
`;
const Main = styled.div`
  ${(props) => props.theme.media.handheld`
    margin: 1em;
  `};
  ${(props) => props.theme.media.screen`
    margin: 2em;
  `};
  ${(props) => props.theme.media.large`
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.theme.size.maxWidth};
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
    <App>
      <Header />
      <GlobalStyle />
      <PageTitle>{title}</PageTitle>
      <Main>{children}</Main>
    </App>
  );
};
