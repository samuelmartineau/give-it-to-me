import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import { AddStepsConnected } from '../../client/components/Add/AddSteps';

const Add = () => <div>add wine</div>;

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(AddStepsConnected);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default AddWithLayout;
