// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import { getWineBottles } from '~/client/store';

type Props = {
  wineId: boolean,
  closeModal: Function
};

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles } = this.props;
    console.log({ bottles });
    return <div>blabla</div>;
  }
}

export default connect(
  (state, { wineId }) => ({ bottles: getWineBottles(state, wineId) }),
  dispatch => ({})
)(WineModalFolders);
