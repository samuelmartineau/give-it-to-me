// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      maxWidth: string;
      radius: string;
      tapTarget: string;
    };
    colors: {
      primary: string;
      primaryDark: string;
      primaryVarient: string;
      secondary: string;
      secondaryVarient: string;
      onPrimary: string;
      onSecondary: string;
      background: string;
      surface: string;
      text: string;
      textMuted: string;
      border: string;
      focus: string;
      danger: string;
    };
    shadow: string;
    media: {
      handheld: Function;
      screen: Function;
      large: Function;
    };
  }
}
