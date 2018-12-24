// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { WineCard } from '~/client/components/Wine/WineCard';
import { getWineById, isWineFiltered } from '~/client/store';

const WineCardStyled = styled(WineCard)`
  align-self: center;
  justify-self: center;
`;

type Props = {
  wine: {},
  children: React.Node,
  isFiltered: boolean
};

class FilteredWine extends React.Component<Props> {
  state = {
    cachedComp: null
  };
  componentDidMount() {
    this.setState({
      cachedComp: (
        <WineCardStyled wine={this.props.wine}>
          {this.props.children}
        </WineCardStyled>
      )
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

export default connect((state, { wineId }) => ({
  wine: getWineById(state, wineId),
  isFiltered: isWineFiltered(state, wineId)
}))(FilteredWine);
