// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import { getWineBottles } from '~/client/store';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from '~/client/components/Cellar/Box/BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import { getCellId } from '~/client/components/Cellar/utils';

type Props = {
  wineId: boolean,
  closeModal: Function
};

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles } = this.props;
    return Object.keys(bottles).map(boxId => (
      <div key={boxId}>
        <BoxContainer boxId={boxId}>
          {/* <BoxCells boxId={boxId}>
            {cellId => (
              <SwitchCell key={cellId} boxId={boxId} cellId={cellId} />
            )}
          </BoxCells> */}
          <BoxBottles boxId={boxId} />
          {/* <BoxCells boxId={boxId}>
            {cellId => (
              <SelectedCell
                key={getCellId(boxId, cellId)}
                boxId={boxId}
                cellId={cellId}
              />
            )}
          </BoxCells> */}
        </BoxContainer>
      </div>
    ));
  }
}

export default connect(
  (state, { wineId }) => ({ bottles: getWineBottles(state, wineId) }),
  dispatch => ({})
)(WineModalFolders);
