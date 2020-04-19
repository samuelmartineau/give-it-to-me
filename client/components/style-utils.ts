import { css } from 'styled-components';

export const media = {
  handheld: (...args) => css`
    @media (max-width: 600px) {
      ${css(...args)};
    }
  `,
  screen: (...args) => css`
    @media (min-width: 601px) {
      ${css(...args)};
    }
  `
};
