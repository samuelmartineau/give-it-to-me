import { getInitialProps } from '~/client/_getInitialProps';
import Home from '~/client/components/Home/Home';
import { Layout } from '~/client/components/Layout/Layout';

const HomeWithLayout = () => (
  <Layout title="Mon activité">
    <Home />
  </Layout>
);

HomeWithLayout.getInitialProps = getInitialProps;

export default HomeWithLayout;
