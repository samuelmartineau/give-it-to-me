import React from 'react';
import styled from 'styled-components';
import SwipeIcon from '@mui/icons-material/SwipeRounded';
import config from '~/config';

const { ZONE_A_SCHEMA, ZONE_B_SCHEMA, CANVAS_WIDTH, CANVAS_HEIGHT, BOX_COLOR } =
  config.cellar;
const { WINE_TYPES } = config.wineTypes;

/**
 * Below this width the cellar is not shrunk any further: it keeps a readable
 * size and the visitor scrolls sideways instead.
 */
const MIN_READABLE_WIDTH = 880;

const Wrapper = styled.div<{ $compact?: boolean }>`
  background: ${({ theme, $compact }) =>
    $compact ? 'transparent' : theme.colors.surface};
  border-radius: ${({ theme }) => theme.size.radius};
  box-shadow: ${({ theme, $compact }) => ($compact ? 'none' : theme.shadow)};
  padding: ${({ $compact }) => ($compact ? '0' : '16px')};

  ${({ theme, $compact }) =>
    !$compact &&
    theme.media.handheld`
      padding: 10px 0;
      margin: 0 -12px;
      border-radius: 0;
    `};
`;

const Scroller = styled.div<{ $compact?: boolean }>`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;

  & > svg {
    display: block;
    width: 100%;
    height: auto;
    min-width: ${({ $compact }) => ($compact ? 0 : MIN_READABLE_WIDTH)}px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ theme }) => theme.media.handheld`
    padding: 0 12px;
  `};
`;

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const LegendItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: capitalize;
`;

const Swatch = styled.span<{ $color: string; $square?: boolean }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: ${({ $square }) => ($square ? '4px' : '50%')};
  background: ${({ $color }) => $color};
  border: 1px solid rgba(0, 0, 0, 0.35);
`;

const ScrollHint = styled.span`
  display: none;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: ${MIN_READABLE_WIDTH + 64}px) {
    display: inline-flex;
  }
`;

type Props = {
  children: React.ReactNode;
  /** Small inline version (inside a wine card): no frame, legend or scroll. */
  compact?: boolean;
  /** Rendered under the cellar plan, above the legend. */
  extra?: React.ReactNode;
};

const CellarContainer = ({ children, compact, extra }: Props) => {
  return (
    <Wrapper $compact={compact}>
      <Scroller $compact={compact}>
        <svg
          data-e2e="cellar"
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          role="img"
          aria-label="Plan de la cave"
        >
          <text x="2" y="5.5" fill="#3a3335" fontSize="5" fontWeight="700">
            {ZONE_B_SCHEMA.label}
          </text>
          <text x="31" y="79.5" fill="#3a3335" fontSize="5" fontWeight="700">
            {ZONE_A_SCHEMA.label}
          </text>
          {children}
        </svg>
      </Scroller>
      {extra}
      {!compact && (
        <Footer>
          <Legend aria-label="Légende">
            {Object.values(WINE_TYPES).map((type) => (
              <LegendItem key={type.label}>
                <Swatch $color={type.color} />
                {type.label}
              </LegendItem>
            ))}
            <LegendItem>
              <Swatch $color={BOX_COLOR} $square />
              Caisse
            </LegendItem>
          </Legend>
          <ScrollHint>
            <SwipeIcon />
            Glisse pour voir toute la cave
          </ScrollHint>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CellarContainer;
