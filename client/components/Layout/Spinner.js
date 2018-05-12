// @flow
import React from 'react';
import { Circle } from 'styled-spinkit';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: 'flex';
  align-items: center;
  justify-content: center;
  margin: 3em 0;
`;

export const Spinner = () => (
  <Wrapper>
    <Circle size={50} />
  </Wrapper>
);
