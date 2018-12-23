// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  getWineBottlesAsMap,
  getRemovedBottles,
  getWineById
} from '~/client/store';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from './BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import ClickHandlerCell from './ClickHandlerCell';

type Props = {
  wineId: boolean,
  closeModal: Function
};

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles, removedBottles, bottleIds } = this.props;
    return Object.keys(bottles).map(boxId => (
      <div key={boxId}>
        <h2>Caisse numéro {boxId}</h2>
        <BoxContainer boxId={boxId}>
          <BoxCells boxId={boxId}>
            {cellId => {
              const bottle = bottles[boxId] ? bottles[boxId][cellId] : null;
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
          <BoxBottles boxId={boxId} selectableBottleIds={bottleIds} />
        </BoxContainer>
      </div>
    ));
  }
}

export default connect((state, { wineId }) => ({
  bottleIds: getWineById(state, wineId).bottleIds,
  bottles: getWineBottlesAsMap(state, wineId),
  removedBottles: getRemovedBottles(state, wineId)
}))(WineModalFolders);
