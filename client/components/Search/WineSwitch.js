// @flow
import React from 'react';
import { connect } from 'react-redux';
import { WineCard } from '../Wine/WineCard';
import { getWineById, isWineFiltered } from '~/client/store';
import styled from 'styled-components';

const WineCardStyled = styled(WineCard)`
  align-self: center;
  justify-self: center;
`;

class WineSwitch extends React.Component {
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

export const WineSwitchConnected = connect((state, { wineId }) => ({
  wine: getWineById(state, wineId),
  isFiltered: isWineFiltered(state, wineId)
}))(WineSwitch);
