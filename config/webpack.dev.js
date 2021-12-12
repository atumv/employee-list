const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 9000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    static: paths.build
  }
});
