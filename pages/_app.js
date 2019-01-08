import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { reduxPage } from '../client/store';
import theme from '../client/components/Toolkit/theme';
import ServerSentEventDispatcher from '../client/store/ServerSentEventDispatcher';

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Give it to me</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <>
              <ServerSentEventDispatcher />
              <Component {...pageProps} />
            </>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default reduxPage(MyApp);
