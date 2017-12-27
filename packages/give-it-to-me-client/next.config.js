const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  webpack: function(c) {
    c.plugins = c.plugins.filter(
      plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    );

    c.plugins.push(new Uglify());

    return c;
  }
};
