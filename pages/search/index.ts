import { compose, withProps } from 'recompose';
import WithLayout from '~/client/components/Layout/WithLayout';
import Search from '~/client/components/Search/Search';
import { syncUrlParams } from '~/client/store';
import { getInitialProps } from '~/client/_getInitialProps';

const SearchWithLayout = compose(
  withProps({
    title: 'Chercher une bouteille',
  }),
  WithLayout
)(Search);

SearchWithLayout.getInitialProps = (props) => {
  const { query, store } = props;
  store.dispatch(syncUrlParams(query));
  return getInitialProps(props);
};

export default SearchWithLayout;
