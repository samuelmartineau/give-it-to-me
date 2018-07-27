// @flow
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose, withState, withHandlers } from 'recompose';
import { media } from '~/client/components/style-utils';

import Header from './Header';

injectGlobal`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

type AppFrameProps = {
  width: Number,
  classes: {},
  title: string,
  children: React$Node
};

const App = styled.div``;
const PageTitle = styled.h1`
  text-align: center;
`;
const Main = styled.div`
  ${media.screen`
    margin-left: auto;
    margin-right: auto;
    max-width: 1260px;
  `};
  ${media.handheld`
    margin: 1em;
  `};
`;

const AppFrame = ({ title, children }: AppFrameProps) => {
  return (
    <App>
      <Header />
      <PageTitle>{title}</PageTitle>
      <Main>{children}</Main>
    </App>
  );
};

const Layout = compose(
  withState('drawerOpen', 'setModalStatus', false),
  withHandlers({
    handleDrawerClose: ({ setModalStatus }) => () =>
      setModalStatus(() => false),
    handleDrawerToggle: ({ setModalStatus }) => () =>
      setModalStatus(open => !open)
  })
)(AppFrame);

export default Layout;
