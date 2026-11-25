import styled, { css } from 'styled-components';

/**
 * Large, clearly labelled button.
 * - `primary`: filled wine red, for the main action of a screen.
 * - default: filled slate blue, for secondary actions.
 * - `variant="ghost"`: outlined, for low-emphasis actions.
 */
export const Button = styled.button<{
  primary?: boolean;
  disabled?: boolean;
  variant?: 'ghost';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ theme }) => theme.size.tapTarget};
  padding: 0 22px;
  border-radius: 12px;
  border: 2px solid transparent;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.15s,
    box-shadow 0.15s,
    transform 0.05s;
  background: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.onSecondary};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  & svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.colors.primaryDark : '#244a5c'};
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ variant, theme }) =>
    variant === 'ghost' &&
    css`
      background: ${theme.colors.surface};
      color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
      box-shadow: none;

      &:hover {
        background: ${theme.colors.secondaryVarient};
      }
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
