import { compose, setDisplayName, withProps } from 'recompose';
import { getCellar, getWineFamilies } from '../../client/store';
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
  const result = await Promise.all([
    store.dispatch(getCellar()),
    store.dispatch(getWineFamilies())
  ]);
  return {
    result
  };
};

export default SearchWithLayout;
