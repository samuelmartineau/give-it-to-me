import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ProviderDecorator from './Provider';

const req = require.context('../components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);

(async function() {
  const ProviderDecoratorLoaded = await ProviderDecorator();
  addDecorator(ProviderDecoratorLoaded);
  configure(loadStories, module);
})();
