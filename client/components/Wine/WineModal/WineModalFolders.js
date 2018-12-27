// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWineBottlesAsMap, getRemovedBottles } from '~/client/store';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import BoxBottles from './BoxBottles';
import ClickHandlerCell from './ClickHandlerCell';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const BoxWrapper = styled.div`
  max-width: 300px;
  display: inline-block;
  margin: 1rem;
  width: 100%;
`;

type Props = {
  wine: {},
  bottles: Array<{}>,
  removedBottles: Array<{}>,
  bottleIds: Array<{}>
};

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles, wine, removedBottles } = this.props;
    const { bottleIds } = wine;
    return (
      <Wrapper>
        {Object.keys(bottles).map(boxId => (
          <BoxWrapper key={boxId}>
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
          </BoxWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default connect((state, { wine: { id } }) => ({
  bottles: getWineBottlesAsMap(state, id),
  removedBottles: getRemovedBottles(state, id)
}))(WineModalFolders);
