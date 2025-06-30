// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      maxWidth: string;
    };
    colors: {
      primary: string;
      primaryVarient: string;
      secondary: string;
      secondaryVarient: string;
      onPrimary: string;
      onSecondary: string;
    };
    media: {
      handheld: Function;
      screen: Function;
      large: Function;
    };
  }
}
