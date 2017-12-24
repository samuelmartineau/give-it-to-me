// @flow
import React, { Component } from 'react';
import Layout from './Layout';

export default Component => props => (
  <Layout {...props} initialWidth="xs">
    <Component />
  </Layout>
);
