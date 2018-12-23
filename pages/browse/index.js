import { compose, withProps } from 'recompose';
import WithLayout from '~/client/components/Layout/WithLayout';
import { Browse } from '~/client/components/Browse/Browse';
import { getInitialProps } from '~/pages/getInitialProps';

const BrowseWithLayout = compose(
  withProps({
    title: 'Parcourir la cave'
  }),
  WithLayout
)(Browse);

BrowseWithLayout.getInitialProps = getInitialProps;

export default BrowseWithLayout;
