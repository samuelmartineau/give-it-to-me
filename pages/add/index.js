import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import { TypesStep } from '../../client/components/Add/TypesStep';

const Add = () => <div>add wine</div>;

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(TypesStep);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default AddWithLayout;
