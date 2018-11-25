// @flow
import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import CellarContainer from '../Cellar/CellarContainer';
import CellarBoxes from '../Cellar/CellarBoxes';
import WineDetails from './WineDetails';
import WineModalButton from './WineModal/WineModalButton';
import { CellarBoxConnected } from './CellarBox';
import FilteredWine from './FilteredWine';
import CellarBottles from './CellarBottles';
import { PICTURE_UPLOAD } from '~/config';
import { getNextHits } from '~/client/store';

type Props = {
  getNextHits: Function,
  wines: Array<string>
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(${PICTURE_UPLOAD.THUMBNAIL.WIDTH + 16}px + 2em), 1fr)
  );
  grid-gap: 30px;
`;

const THROTTLE_WAIT = 100;

class WinesList extends React.Component<Props> {
  static scrollFunction;
  scrollFunction: Function;

  constructor(props: Props) {
    super(props);
    this.scrollFunction = this.trottleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
    window.addEventListener('resize', this.scrollFunction);
    this.trottleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
    window.removeEventListener('resize', this.scrollFunction);
  }

  trottleScroll = throttle(this.handleScroll, THROTTLE_WAIT);

  handleScroll() {
    if (
      window.scrollY + window.innerHeight >
      document.body.scrollHeight - 200
    ) {
      this.props.getNextHits();
    }
  }
  render() {
    const { wines } = this.props;
    return (
      <Wrapper>
        {wines.map(wineId => (
          <FilteredWine key={wineId} wineId={wineId}>
            {wine => {
              return (
                <React.Fragment>
                  <CellarContainer>
                    <CellarBoxes>
                      {boxId => (
                        <CellarBoxConnected
                          boxId={boxId}
                          wineId={wine.id}
                          key={boxId}
                        />
                      )}
                    </CellarBoxes>
                    <CellarBottles wineId={wine.id} />
                  </CellarContainer>
                  <WineDetails wine={wine} />
                  <WineModalButton wineId={wine.id} />
                </React.Fragment>
              );
            }}
          </FilteredWine>
        ))}
      </Wrapper>
    );
  }
}

export default connect(
  state => ({ wines: state.wines.all }),
  dispatch => ({
    getNextHits() {
      dispatch(getNextHits());
    }
  })
)(WinesList);
