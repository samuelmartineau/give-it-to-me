import { AddStepsConnected } from '../../client/components/Add/AddSteps';
import { getInitialProps } from '~/client/_getInitialProps';
import { Layout } from '~/client/components/Layout/Layout';

const AddWithLayout = () => (
  <Layout title="Ajouter une nouvelle bouteille">
    <AddStepsConnected />
  </Layout>
);

AddWithLayout.getInitialProps = getInitialProps;

export default AddWithLayout;
