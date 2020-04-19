import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import { reduxPage, RootState } from '../client/store';
import theme from '../client/components/Toolkit/theme';
import ServerSentEventDispatcher from '../client/store/ServerSentEventDispatcher';
import { ReduxWrapperAppProps } from 'next-redux-wrapper';

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
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
      </>
    );
  }
}

export default reduxPage(MyApp);
