// @flow
import React from 'react';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = () => (
  <Wrapper>
    <BounceLoader size={50} color={'#123abc'} />
  </Wrapper>
);
