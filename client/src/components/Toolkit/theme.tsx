import { css, DefaultTheme, CSSObject, Interpolation } from 'styled-components';

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
    maxWidth: '1320px',
    radius: '14px',
    tapTarget: '52px',
  },
  colors: {
    // Wine red: main brand colour, used for primary actions and the header.
    primary: '#7a1f3d',
    primaryDark: '#5c1530',
    primaryVarient: '#f6e9ee',
    // Slate blue: secondary actions and selection.
    secondary: '#2f5d73',
    secondaryVarient: '#e3eef3',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    background: '#f7f3ee',
    surface: '#ffffff',
    text: '#1d1a1b',
    textMuted: '#5a5356',
    border: '#e2d9d1',
    focus: '#f2b134',
    danger: '#b3261e',
  },
  shadow: '0 1px 2px rgba(40, 20, 25, 0.06), 0 4px 16px rgba(40, 20, 25, 0.06)',
  media,
};

export default theme;
