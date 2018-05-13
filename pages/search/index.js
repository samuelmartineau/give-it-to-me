import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar } from '../../client/store';
import WithLayout from '../../client/components/Layout/WithLayout';
import { Search } from '../../client/components/Search/Search';

const SearchWithLayout = compose(
  setDisplayName('SearchPage'),
  withProps({
    title: 'Chercher une nouvelle bouteille'
  }),
  WithLayout
)(Search);

SearchWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default SearchWithLayout;
