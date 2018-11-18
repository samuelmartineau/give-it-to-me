// @flow
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import CellarBox from './CellarBox';

const CellarBoxStyled = styled(CellarBox)`
  cursor: pointer;

  &:hover {
    fill: #7098d6;
  }
`;

export default compose(
  withProps(({ onSelect, boxId }) => ({
    onSelect: () => onSelect(boxId)
  }))
)(CellarBoxStyled);
