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

const theme = {
  colors: {
    primary: '#5e0231',
    primaryVarient: '#dbc3d0',
    secondary: '#856046',
    secondaryVarient: '#c7a693',
    onPrimary: '#000000',
    onSecondary: '#ffffff'
  },
  media
};

export default theme;
