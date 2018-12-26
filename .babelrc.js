const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define', env],
    'babel-plugin-root-import',
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ],
    'transform-flow-strip-types'
  ]
};
