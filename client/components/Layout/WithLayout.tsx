import React from 'react';
import { Layout } from './Layout';

export default (Component) => (props) => (
  <Layout {...props}>
    <Component />
  </Layout>
);
