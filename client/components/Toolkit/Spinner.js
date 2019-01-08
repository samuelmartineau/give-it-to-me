// @flow
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  margin: auto;
`;
const Svg = styled.svg`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
`;
const Circle = styled.circle`
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  stroke-dasharray: 89, 200;
  stroke-dashoffset: -10px;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: ${({ theme }) => theme.colors.primary};
`;

export const Spinner = () => (
  <Wrapper>
    <Svg viewBox="0 0 66 66">
      <Circle
        cx="33"
        cy="33"
        r="30"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </Svg>
  </Wrapper>
);
