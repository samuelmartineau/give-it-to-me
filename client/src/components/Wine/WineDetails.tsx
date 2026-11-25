import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';
import { RootState } from '@/store';
import { WineEnhanced } from '@/Cellar.type';
const { BOTTLE_TYPES } = config.bottleTypes;

const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

const Wrapper = styled.div``;

const Text = styled.div<{ wine: WineEnhanced }>`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  & + & {
    margin-top: 8px;
  }
`;
const Highlight = styled.span<{ wine: WineEnhanced }>`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

type RawProps = { wine: WineEnhanced; className?: string };

type Props = RawProps & PropsFromRedux;

const WineDetails: FC<Props> = ({ wine, wineFamily, className }) => {
  const type = WINE_TYPES[wine.wineType];
  const category = WINE_CATEGORIES[wine.wineCategory];
  return (
    <Wrapper className={className}>
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
        de <Highlight wine={wine}>{wine.year}</Highlight> avec une appellation{' '}
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
