import { compose, setDisplayName, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getCellar, getWineFamilies } from '../client/store';
import WithLayout from '../client/components/Layout/WithLayout';
// import CellarContainer from '../components/Cellar/CellarContainer';
// import CellarBoxes from '../components/Cellar/CellarBoxes';
// import CellarBottles from '../components/Cellar/CellarBottles';
// import CellarBox from '../components/Cellar/CellarBox';

const Home = ({ wines }) => (
  <div>
    {wines.all.map(id => (
      <span style={{ display: 'inline-block' }} key={id}>
        {id}
      </span>
    ))}
    {/* <CellarContainer>
      <CellarBoxes>{boxId => <CellarBox boxId={boxId} />}</CellarBoxes>
      <CellarBottles />
    </CellarContainer> */}
  </div>
);

const HomeConnected = connect(state => {
  return { wines: state.wines };
})(Home);

const HomeWithLayout = compose(
  setDisplayName('HomePage'),
  withProps({
    title: 'Mon activé'
  }),
  WithLayout
)(HomeConnected);

HomeWithLayout.getInitialProps = async ({ store }) => {
  const result = await Promise.all([
    store.dispatch(getCellar()),
    store.dispatch(getWineFamilies())
  ]);
  return {
    result
  };
};

export default HomeWithLayout;
