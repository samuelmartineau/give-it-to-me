// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getWineBottles, getRemovedBottles, getWineById } from '~/client/store';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from '~/client/components/Cellar/Box/BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import ClickHandlerCell from './ClickHandlerCell';

type Props = {
  wineId: boolean,
  closeModal: Function
};

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles, removedBottles } = this.props;
    console.log({ bottles, removedBottles });
    return Object.keys(bottles).map(boxId => (
      <div key={boxId}>
        <h2>Caisse numéro {boxId}</h2>
        <BoxContainer boxId={boxId}>
          <BoxCells boxId={boxId}>
            {cellId => {
              const bottle = bottles[boxId] ? bottles[boxId][cellId] : null;
              console.log(bottle);
              return (
                <ClickHandlerCell
                  key={cellId}
                  isCellSelected={
                    !!bottle && removedBottles.includes(bottle.id)
                  }
                  isCellSelectable={!!bottle}
                  bottleId={bottle ? bottle.id : null}
                  boxId={boxId}
                  cellId={cellId}
                />
              );
            }}
          </BoxCells>
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
  (state, { wineId }) => ({
    bottles: getWineBottles(state, wineId),
    removedBottles: getRemovedBottles(state, wineId)
  }),
  dispatch => ({})
)(WineModalFolders);
