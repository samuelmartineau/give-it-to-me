import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar, getWineFamilies } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import { AddStepsConnected } from '../../client/components/Add/AddSteps';

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(AddStepsConnected);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await Promise.all([
    store.dispatch(getCellar()),
    store.dispatch(getWineFamilies())
  ]);
  return {
    result
  };
};

export default AddWithLayout;
