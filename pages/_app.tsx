import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/node';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import { reduxPage, RootState } from '../client/store';
import theme from '../client/components/Toolkit/theme';
import ServerSentEventDispatcher from '../client/store/ServerSentEventDispatcher';
import { ReduxWrapperAppProps } from 'next-redux-wrapper';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.SENTRY_DSN,
});

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
  render() {
    const { Component, pageProps, store } = this.props;
    // Workaround for https://github.com/zeit/next.js/issues/8592
    // @ts-ignore
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };
    return (
      <>
        <Head>
          <title>Give it to me</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <>
              <ServerSentEventDispatcher />
              <Component {...modifiedPageProps} />
            </>
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default reduxPage(MyApp);
