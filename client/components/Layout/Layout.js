// @flow
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose, withState, withHandlers } from 'recompose';

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
  children: ReactElement
};

const App = styled.div``;
const Main = styled.div`
  display: inline-block;
  width: 100%;
`;

const AppFrame = ({ title, children }: AppFrameProps) => {
  return (
    <App>
      <Header>title {title}</Header>
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
