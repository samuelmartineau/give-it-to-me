import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';
import {
  getOutsideWines,
  RootState,
  selectOutsideWineToBrowse,
  unselectOutsideWineToBrowse,
} from '@/store';

const { BOX_COLOR, BOX_BORDER_COLOR, SELECTED_COLOR } = config.cellar;
const { WINE_TYPES } = config.wineTypes;
const { BOTTLE_TYPES } = config.bottleTypes;

/** Bigger bottles get bigger rectangles: [min width, min height] by type. */
const SIZES: Record<string, [number, number]> = {
  '0': [110, 56],
  '1': [130, 56],
  '2': [150, 68],
  '3': [170, 80],
  '4': [190, 92],
};

const Section = styled.section`
  margin-top: 18px;
  padding: 14px 4px 0;
  border-top: 1px dashed #d8cbbd;

  ${({ theme }) => theme.media.handheld`
    margin: 18px 12px 0;
  `};
`;

const Title = styled.h3`
  margin: 0 0 14px;
  font-size: 1.05rem;
  color: #3a3335;
`;

const Count = styled.span`
  margin-left: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Shelf = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px 12px;
  margin: 0;
  padding: 10px 10px 0 0;
  list-style: none;
`;

const Bottle = styled.button<{
  $color: string;
  $size: [number, number];
  $selected: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: ${({ $size }) => $size[0]}px;
  min-height: ${({ $size }) => $size[1]}px;
  padding: 8px 12px 8px 18px;
  border: 3px solid
    ${({ $selected }) => ($selected ? SELECTED_COLOR : BOX_BORDER_COLOR)};
  border-radius: 6px;
  background: ${({ $selected }) => ($selected ? '#cfe0f5' : BOX_COLOR)};
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 7px;
    background: ${({ $color }) => $color};
  }

  &:hover {
    background: #cfe0f5;
  }

  &:focus-visible {
    outline: 3px solid ${SELECTED_COLOR};
    outline-offset: 2px;
  }
`;

const Format = styled.strong`
  font-size: 1rem;
  text-transform: capitalize;
  white-space: nowrap;
`;

const Name = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

const Badge = styled.span<{ $color: string }>`
  position: absolute;
  top: -11px;
  right: -11px;
  min-width: 22px;
  padding: 1px 7px;
  border: 2px solid #fff;
  border-radius: 12px;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
`;

/**
 * Wines stored outside the boxes (big formats, cartons...) have no cell in the
 * cellar plan: list them as rectangles labelled with their bottle size.
 */
const OutsideWines = () => {
  const dispatch = useDispatch();
  const wines = useSelector(getOutsideWines);
  const selectedId = useSelector(
    (state: RootState) => state.browse.outsideWineId,
  );

  if (wines.length === 0) return null;

  const bottles = wines.reduce((sum, wine) => sum + wine.bottlesCount, 0);

  return (
    <Section aria-labelledby="outside-wines-title" data-e2e="outside-wines">
      <Title id="outside-wines-title">
        Hors caisses
        <Count>
          {wines.length} vin{wines.length > 1 && 's'} · {bottles} bouteille
          {bottles > 1 && 's'}
        </Count>
      </Title>
      <Shelf>
        {wines.map((wine) => {
          const selected = wine.id === selectedId;
          const color = WINE_TYPES[wine.wineType]?.color ?? BOX_BORDER_COLOR;
          const format = BOTTLE_TYPES[wine.bottleType]?.label ?? 'bouteille';
          return (
            <li key={wine.id}>
              <Bottle
                type="button"
                $color={color}
                $size={SIZES[wine.bottleType] ?? SIZES['1']}
                $selected={selected}
                aria-pressed={selected}
                onClick={() =>
                  dispatch(
                    selected
                      ? unselectOutsideWineToBrowse()
                      : selectOutsideWineToBrowse(wine.id),
                  )
                }
              >
                <Format>{format}</Format>
                <Name>
                  {wine.name} {wine.year}
                </Name>
                <Badge
                  $color={color}
                  aria-label={`${wine.bottlesCount} restante${wine.bottlesCount > 1 ? 's' : ''}`}
                >
                  {wine.bottlesCount}
                </Badge>
              </Bottle>
            </li>
          );
        })}
      </Shelf>
    </Section>
  );
};

export default OutsideWines;
