import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import gitmTheme from '../components/theme';
const theme = createMuiTheme(gitmTheme);

export default function ThemeDecorator(storyFn) {
  return <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>;
}
