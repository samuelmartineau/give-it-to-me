import {
  css,
  DefaultTheme,
  CSSObject,
  Interpolation,
} from 'styled-components';

type SimpleInterpolation = Interpolation<object>;

export const media = {
  handheld: (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (max-width: 600px) {
      ${css(first, ...interpolations)};
    }
  `,
  screen: (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: 601px) {
      ${css(first, ...interpolations)};
    }
  `,
  large: (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: 1261px) {
      ${css(first, ...interpolations)};
    }
  `,
};

const theme: DefaultTheme = {
  size: {
    maxWidth: '1260px',
  },
  colors: {
    primary: '#5e0231',
    primaryVarient: '#dbc3d0',
    secondary: '#856046',
    secondaryVarient: '#c7a693',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
  },
  media,
};

export default theme;
