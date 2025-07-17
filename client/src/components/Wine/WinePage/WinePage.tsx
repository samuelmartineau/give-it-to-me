import React from 'react';
import config from '~/config';
import tinycolor from 'tinycolor2';
import fontColorContrast from 'font-color-contrast';

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

const { WINE_TYPES } = config.wineTypes;

const WinePageHeader = styled.div`
  display: flex;
`;

const StyledImage = styled(Image)`
  margin: 16px;
`;

const StyledWineDetails = styled(WineDetails)`
  margin: 16px;
  align-items: center;
`;

const Cellar = styled.div`
  padding: 16px;
  display: flex;
`;

interface WinePageProps {
  wine: WineAndBottles;
}

const WinePage: React.FC<WinePageProps> = ({ wine }) => {
  const wineColor = WINE_TYPES[wine.wineType].color;
  const textColor = fontColorContrast(wineColor);
  const softColor = tinycolor(wineColor).lighten(20).toString();

  return (
    <div style={{ background: softColor, color: textColor }}>
      <WinePageHeader>
        <StyledImage
          width={config.PICTURE_UPLOAD.THUMBNAIL.WIDTH}
          height={config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
          src={wine.thumbnailFileName}
          lazyLoader={wine.blur}
        />
        <StyledWineDetails wine={enhanceWine(wine)} />
      </WinePageHeader>

      {!!wine.isInBoxes && (
        <Cellar>
          <CellarContainer>
            <CellarBoxes>
              {(boxId) => (
                <CellarBoxStyled
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
        </Cellar>
      )}
    </div>
  );
};

export default WinePage;
