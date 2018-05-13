import { compose, setDisplayName, withProps } from 'recompose';
import WithLayout from '../../client/components/Layout/WithLayout';
import { AddStepsConnected } from '../../client/components/Add/AddSteps';

const Browse = () => <div>Browse your wines</div>;

const BrowseWithLayout = compose(
  setDisplayName('BrowsePage'),
  withProps({
    title: 'Ajouter une nouvelle bouteille'
  }),
  WithLayout
)(Browse);

export default BrowseWithLayout;
