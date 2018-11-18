import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { reduxPage } from '../client/store';
import theme from '../client/components/Toolkit/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default reduxPage(MyApp);
