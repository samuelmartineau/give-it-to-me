import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';
import { RootState } from '~/client/store';
import { WineEnhanced } from '~/client/Cellar.type';
const { BOTTLE_TYPES } = config.bottleTypes;

const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

const Wrapper = styled.div``;

const Text = styled.div<{ wine: WineEnhanced }>`
  font-size: 20px;
  color: ${({ wine }) => (wine.wineType !== 'RED' ? '#373737' : '#eee')};
`;
const Highlight = styled.span<{ wine: WineEnhanced }>`
  font-weight: bold;
  font-size: 25px;
  font-style: italic;
  color: ${({ wine }) => (wine.wineType !== 'RED' ? 'black' : 'white')};
`;

type RawProps = { wine: WineEnhanced };

type Props = RawProps & PropsFromRedux;

const WineDetails: FC<Props> = ({ wine, wineFamily }) => {
  const type = WINE_TYPES[wine.wineType];
  const category = WINE_CATEGORIES[wine.wineCategory];
  return (
    <Wrapper>
      <Text wine={wine}>
        Il reste{' '}
        <Highlight wine={wine}>
          {wine.bottlesCount} {BOTTLE_TYPES[wine.bottleType].label}
          {wine.bottlesCount > 1 && 's'}
        </Highlight>{' '}
        de{' '}
        <Highlight wine={wine}>
          {type.label} {wine.wineCategory !== 'REGULAR' && category.label}
        </Highlight>{' '}
        de <Highlight wine={wine}>{wine.year}</Highlight> avec une appelation{' '}
        <Highlight wine={wine}>{wineFamily.name.toLowerCase()}</Highlight>{' '}
        {wine.source && (
          <>
            provenant de <Highlight wine={wine}>{wine.source}</Highlight>
          </>
        )}
      </Text>
      {!wine.isInBoxes && (
        <Text wine={wine}>
          Ce vin est hors des casiers, voici sa position:{' '}
          <Highlight wine={wine}>{wine.positionComment}</Highlight>
        </Text>
      )}
    </Wrapper>
  );
};

const connector = connect((state: RootState, { wine }: RawProps) => ({
  wineFamily: state.wineFamilies.map[wine.wineFamily],
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineDetails);
