import React from 'react';
import config from '~/config';
import tinycolor from 'tinycolor2';

import WineDetails from '../WineDetails';
import { WineAndBottles } from '@/Cellar.type';
import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import { CellarBoxStyled } from '../CellarBox';
import { CellarBottles } from '../CellarBottles';
import { enhanceBottle } from '@/store/bottles/bottles.reducer';
import { enhanceWine } from '@/store/wines/wines.reducer';
import { Image } from '@/components/Image/Image';
import styled from 'styled-components';
import { Card, Section, SectionTitle } from '@/components/Toolkit';

const { WINE_TYPES } = config.wineTypes;

const Header = styled(Card)`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  border-top: 10px solid var(--wine-color);

  ${(props) => props.theme.media.handheld`
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `};
`;

const StyledImage = styled(Image)`
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 12px;
`;

interface WinePageProps {
  wine: WineAndBottles;
}

const WinePage: React.FC<WinePageProps> = ({ wine }) => {
  const wineColor = WINE_TYPES[wine.wineType].color;
  const textColor = tinycolor(wineColor).isLight() ? '#1d1a1b' : '#ffffff';

  return (
    <div style={{ '--wine-color': wineColor } as React.CSSProperties}>
      <Header>
        <a href={wine.pictureFileName} target="_blank" rel="noreferrer">
          <StyledImage
            width={config.PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={wine.thumbnailFileName}
            lazyLoader={wine.blur}
          />
        </a>
        <div>
          <Badge style={{ background: wineColor, color: textColor }}>
            {WINE_TYPES[wine.wineType].label} · {wine.year}
          </Badge>
          <WineDetails wine={enhanceWine(wine)} />
        </div>
      </Header>

      {!!wine.isInBoxes && (
        <Section>
          <SectionTitle>Emplacement dans la cave</SectionTitle>
          <CellarContainer>
            <CellarBoxes>
              {(boxId) => (
                <CellarBoxStyled
                  key={boxId}
                  boxId={boxId}
                  isWineInBox={
                    !!wine.bottles.find((bottle) => bottle.box === boxId)
                  }
                />
              )}
            </CellarBoxes>
            <CellarBottles
              bottles={wine.bottles.map((bottle) =>
                enhanceBottle(bottle, wine.id, wine.wineType),
              )}
            />
          </CellarContainer>
        </Section>
      )}
    </div>
  );
};

export default WinePage;
