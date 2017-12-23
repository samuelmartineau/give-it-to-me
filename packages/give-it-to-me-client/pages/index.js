import { compose, setDisplayName, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getCellar, reduxPage } from '../store';
import withRoot from '../components/withRoot';
import WithLayout from '../components/Layout/WithLayout';
import CellarSchemaPresentation from '../components/Cellar/CellarSchemaPresentation';

const Home = ({ cellar }) => (
  <div>
    {cellar.all.map(id => <i key={id}>{id}</i>)}
    <CellarSchemaPresentation />
  </div>
);

const HomeConnected = connect(state => {
  return { cellar: state.cellar };
})(Home);

const HomeWithLayout = compose(
  setDisplayName('HomePage'),
  withProps({
    title: 'Mon activé'
  }),
  withRoot,
  WithLayout
)(HomeConnected);

HomeWithLayout.getInitialProps = async ({ store }) => {
  const result = await store.dispatch(getCellar());
  return {
    result
  };
};

export default reduxPage(HomeWithLayout);