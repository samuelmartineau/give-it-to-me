import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { reduxPage } from '../client/store';
import theme from '../client/components/Toolkit/theme';
import ServerSentEventDispatcher from '../client/store/ServerSentEventDispatcher';

class MyApp extends App {
  async componentDidMount() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration('/');
        if (!registration) {
          await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          });

          console.log(`Registration successful`);
        }
      } catch (e) {
        console.warn(`Registration failed: ${e}`);
      }
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>Give it to me</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ServerSentEventDispatcher>
              <Component {...pageProps} />
            </ServerSentEventDispatcher>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default reduxPage(MyApp);
