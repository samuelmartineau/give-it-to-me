import styled from 'styled-components';

export const Button = styled.button`
  background: ${props =>
    props.primary ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props =>
    props.primary
      ? props.theme.colors.onPrimary
      : props.theme.colors.onSecondary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid
    ${props =>
      props.primary
        ? props.theme.colors.primaryVarient
        : props.theme.colors.secondaryVarient};
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
