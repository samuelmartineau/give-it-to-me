// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  flex: 1;
  color: palevioletred;
`;
const Icon = styled.i`
  text-align: center;
  flex: 1;
  color: palevioletred;
 
  & svg {
    font-size: 100px;
  }
}
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Content = styled.p`
  font-size: 20px;
  max-width: 400px;
  display: inline-block;
`;

type Props = {
  icon: React.Node,
  title: React.Node,
  message: string
};

export const MessageManager = ({ icon, title, message }: Props) => {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Content>{message}</Content>
    </Wrapper>
  );
};
