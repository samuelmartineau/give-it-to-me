import Search from '~/client/components/Search/Search';
import { syncUrlParams } from '~/client/store';
import { getInitialProps } from '~/client/_getInitialProps';
import { Layout } from '~/client/components/Layout/Layout';

const SearchWithLayout = () => (
  <Layout title="Chercher une bouteille">
    <Search />
  </Layout>
);

SearchWithLayout.getInitialProps = (props) => {
  const { query, store } = props;
  store.dispatch(syncUrlParams(query));
  return getInitialProps(props);
};

export default SearchWithLayout;
