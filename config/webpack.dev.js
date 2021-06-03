const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
	  open: true,
	  hot: true,
	  compress: true,
    historyApiFallback: true,
    contentBase: paths.build
  }
});