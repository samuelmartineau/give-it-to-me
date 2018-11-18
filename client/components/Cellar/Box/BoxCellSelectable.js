// @flow
import { compose, withProps } from 'recompose';
import styled from 'styled-components';

import BoxCell from './BoxCell';

const BoxCellStyled = styled(BoxCell)`
  cursor: pointer;

  &:hover {
    fill: #7098d6;
  }
`;

export default compose(
  withProps(({ onSelect, boxId, cellId }) => ({
    onSelect: () => onSelect(boxId, cellId)
  }))
)(BoxCellStyled);
