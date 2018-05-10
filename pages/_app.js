import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { reduxPage } from '../client/store';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="layout">{children}</div>;
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default reduxPage(MyApp);
