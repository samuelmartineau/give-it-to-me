import { Browse } from '~/client/components/Browse/Browse';
import { getInitialProps } from '~/client/_getInitialProps';
import { Layout } from '~/client/components/Layout/Layout';

const BrowseWithLayout = () => (
  <Layout title="Parcourir la cave">
    <Browse />
  </Layout>
);

BrowseWithLayout.getInitialProps = getInitialProps;

export default BrowseWithLayout;
