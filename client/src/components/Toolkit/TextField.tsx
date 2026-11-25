import styled from 'styled-components';

export const TextField = styled.input`
  display: block;
  width: 100%;
  min-height: 56px;
  margin: 0;
  padding: 0 16px;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: border-color 0.15s;

  &::placeholder {
    color: #9a9194;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondaryVarient};
  }
`;
