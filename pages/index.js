import { compose, setDisplayName, withProps } from 'recompose';
import { getInitialProps } from '~/pages/getInitialProps';
import WithLayout from '../client/components/Layout/WithLayout';
import Home from '~/client/components/Home/Home';

const HomeWithLayout = compose(
  setDisplayName('HomePage'),
  withProps({
    title: 'Mon activité'
  }),
  WithLayout
)(Home);

HomeWithLayout.getInitialProps = getInitialProps;

export default HomeWithLayout;
