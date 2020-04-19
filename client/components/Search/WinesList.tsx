import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from 'lodash/throttle';
import FilteredWine from './FilteredWine';
import { WineList } from '~/client/components/Toolkit';
import { getNextHits, RootState } from '~/client/store';
import { WineContentCard } from '~/client/components/Wine/WineContentCard';

type Props = PropsFromRedux;

const THROTTLE_WAIT = 100;

class WinesList extends React.Component<Props> {
  scrollFunction: (this: Window, ev: UIEvent) => any;

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
      <WineList>
        {wines.map((wineId) => (
          <FilteredWine key={wineId} wineId={wineId}>
            {(wine) => {
              return <WineContentCard wine={wine} />;
            }}
          </FilteredWine>
        ))}
      </WineList>
    );
  }
}

const connector = connect(
  (state: RootState) => ({ wines: state.wines.all }),
  (dispatch) => ({
    getNextHits() {
      dispatch(getNextHits());
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WinesList);
