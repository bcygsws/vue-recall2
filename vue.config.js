const path = require('path');
module.exports = {
  devServer: {
    port: 8172,
    open: true,
    host: 'localhost',
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, './src/assets/style/index.styl')],
    },
  },
};
