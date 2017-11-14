import { configure, addDecorator } from "@storybook/react";
import ProviderDecorator from "./Provider";

const req = require.context("../components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(ProviderDecorator);

configure(loadStories, module);
