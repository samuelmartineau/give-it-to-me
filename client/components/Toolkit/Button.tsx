import styled from 'styled-components';

export const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  background: ${(props) =>
    props.primary ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.onSecondary};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid
    ${(props) =>
      props.primary
        ? props.theme.colors.primaryVarient
        : props.theme.colors.secondaryVarient};
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.65 : 1)};
  cursor: ${(props) => (props.disabled ? ' not-allowed' : 'normal')};
`;
