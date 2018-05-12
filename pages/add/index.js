import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import { PictureStep } from '../../client/components/Add/PictureStep';

const Add = () => <div>add wine</div>;

const AddWithLayout = compose(
  setDisplayName('AddPage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(PictureStep);

AddWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default AddWithLayout;
