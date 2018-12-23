import { compose, withProps } from 'recompose';
import WithLayout from '~/client/components/Layout/WithLayout';
import { Search } from '~/client/components/Search/Search';
import { getInitialProps } from '~/pages/getInitialProps';

const SearchWithLayout = compose(
  withProps({
    title: 'Chercher une bouteille'
  }),
  WithLayout
)(Search);

SearchWithLayout.getInitialProps = getInitialProps;

export default SearchWithLayout;
