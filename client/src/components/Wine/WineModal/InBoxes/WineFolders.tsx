import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { getWineBottlesAsMap, getRemovedBottles, RootState } from '@/store';
import BoxContainer from '@/components/Cellar/Box/BoxContainer';
import BoxCells from '@/components/Cellar/Cells/BoxCells';
import BoxBottles from './BoxBottles';
import { SelectableCell, UnSelectableCell } from './ClickHandlerCell';
import { WineEnhanced } from '@/Cellar.type';
import BoxCell from '@/components/Cellar/Box/BoxCell';

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
                  if (!bottle) {
                    return <BoxCell cellId={cellId} />;
                  }
                  if (removedBottles.includes(bottle.id)) {
                    return (
                      <UnSelectableCell
                        bottleId={bottle.id}
                        boxId={parseInt(boxId, 10)}
                        cellId={cellId}
                      />
                    );
                  }
                  return (
                    <SelectableCell
                      bottleId={bottle.id}
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
