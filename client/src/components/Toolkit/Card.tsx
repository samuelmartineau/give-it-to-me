import styled from 'styled-components';

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.size.radius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 24px;

  ${({ theme }) => theme.media.handheld`
    padding: 16px;
  `};
`;

export const Section = styled.section`
  margin-top: 40px;

  ${({ theme }) => theme.media.handheld`
    margin-top: 32px;
  `};
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.media.handheld`
    font-size: 1.3rem;
  `};
`;

export const Hint = styled.p`
  margin: -8px 0 16px;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
