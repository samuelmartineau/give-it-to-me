import { PICTURE_UPLOAD } from '~/config';

import styled from 'styled-components';

export const WineList = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(${PICTURE_UPLOAD.THUMBNAIL.WIDTH}px + 2em), 1fr)
  );
  grid-gap: 30px;
`;
