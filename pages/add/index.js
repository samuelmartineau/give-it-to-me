import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import MetaStep from '../../client/components/Add/MetaStep';

const Add = () => <div>add wine</div>;

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(MetaStep);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default AddWithLayout;
