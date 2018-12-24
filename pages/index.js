import { compose, setDisplayName, withProps } from 'recompose';
import { connect } from 'react-redux';
import { getInitialProps } from '~/pages/getInitialProps';
import WithLayout from '../client/components/Layout/WithLayout';

import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import CellarBottles from '~/client/components/Cellar/CellarBottles';
import CellarBox from '~/client/components/Cellar/CellarBox';

const Home = ({ wines }) => (
  <div>
    <h1>Bonjour, il te reste {wines.length} vins 😃</h1>
    <CellarContainer>
      <CellarBoxes>
        {boxId => <CellarBox key={boxId} boxId={boxId} />}
      </CellarBoxes>
      <CellarBottles />
    </CellarContainer>
  </div>
);

const HomeConnected = connect(state => {
  return { wines: state.wines.all };
})(Home);

const HomeWithLayout = compose(
  setDisplayName('HomePage'),
  withProps({
    title: 'Mon activé'
  }),
  WithLayout
)(HomeConnected);

HomeWithLayout.getInitialProps = getInitialProps;

export default HomeWithLayout;
