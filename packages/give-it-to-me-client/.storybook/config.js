import { configure, addDecorator } from '@storybook/react';
import ProviderDecorator from './Provider';
import ThemeDecorator from './Theme';

const req = require.context('../components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(ProviderDecorator);
addDecorator(ThemeDecorator);

configure(loadStories, module);
