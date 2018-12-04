import { compose, withProps } from 'recompose';
import WithLayout from '../../client/components/Layout/WithLayout';

const Browse = () => <div>Browse your wines</div>;

const BrowseWithLayout = compose(
  withProps({
    title: 'Trouver vos bouteilles'
  }),
  WithLayout
)(Browse);

export default BrowseWithLayout;
