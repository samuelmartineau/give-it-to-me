import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import {
  getWineBottlesAsMap,
  getRemovedBottles,
  RootState,
} from '~/client/store';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import BoxBottles from './BoxBottles';
import ClickHandlerCell from './ClickHandlerCell';
import { WineEnhanced } from '~/client/Cellar.type';

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

type RawProps = {
  wine: WineEnhanced;
};

type Props = RawProps & PropsFromRedux;

class WineModalFolders extends React.PureComponent<Props> {
  render() {
    const { bottles, wine, removedBottles } = this.props;
    const { bottleIds } = wine;
    return (
      <Wrapper>
        {Object.keys(bottles).map((boxId) => (
          <BoxWrapper key={boxId}>
            <h2>Caisse numéro {boxId}</h2>
            <BoxContainer boxId={parseInt(boxId, 10)}>
              <BoxCells boxId={parseInt(boxId, 10)}>
                {(cellId) => {
                  const bottle = bottles[boxId] ? bottles[boxId][cellId] : null;
                  return (
                    <ClickHandlerCell
                      key={cellId}
                      isCellSelected={
                        !!bottle && removedBottles.includes(bottle.id)
                      }
                      isCellSelectable={!!bottle}
                      bottleId={bottle ? bottle.id : null}
                      boxId={parseInt(boxId, 10)}
                      cellId={cellId}
                    />
                  );
                }}
              </BoxCells>
              <BoxBottles
                boxId={parseInt(boxId, 10)}
                selectableBottleIds={bottleIds}
              />
            </BoxContainer>
          </BoxWrapper>
        ))}
      </Wrapper>
    );
  }
}

const connector = connect((state: RootState, { wine: { id } }: RawProps) => ({
  bottles: getWineBottlesAsMap(state, id),
  removedBottles: getRemovedBottles(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineModalFolders);
