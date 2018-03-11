import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar, reduxPage, setStep } from '../../store';
import withRoot from '../../components/withRoot';
import WithLayout from '../../components/Layout/WithLayout';
import AddSteps from '../../components/Add/AddSteps';

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  withRoot,
  WithLayout
)(AddSteps);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default reduxPage(AddWithLayout);
