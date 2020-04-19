import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { WineCard } from '~/client/components/Wine/WineCard';
import { getWineById, isWineFiltered, RootState } from '~/client/store';

const WineCardStyled = styled(WineCard)`
  align-self: center;
  justify-self: center;
`;

type Props = PropsFromRedux;

class FilteredWine extends React.Component<Props> {
  state = {
    cachedComp: null,
  };
  componentDidMount() {
    this.setState({
      cachedComp: (
        <WineCardStyled wine={this.props.wine}>
          {this.props.children}
        </WineCardStyled>
      ),
    });
  }
  render() {
    const { isFiltered } = this.props;
    if (!isFiltered) {
      return null;
    }
    return this.state.cachedComp;
  }
}

const connector = connect(
  (state: RootState, { wineId }: { wineId: number }) => ({
    wine: getWineById(state, wineId),
    isFiltered: isWineFiltered(state, wineId),
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FilteredWine);
