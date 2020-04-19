import { compose, withProps } from 'recompose';
import WithLayout from '../../client/components/Layout/WithLayout';
import { AddStepsConnected } from '../../client/components/Add/AddSteps';
import { getInitialProps } from '~/client/_getInitialProps';

const AddWithLayout = compose(
  withProps({
    title: 'Ajouter une nouvelle bouteille',
  }),
  WithLayout
)(AddStepsConnected);

AddWithLayout.getInitialProps = getInitialProps;

export default AddWithLayout;
