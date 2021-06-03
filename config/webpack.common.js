const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("es6-promise").polyfill();

module.exports = {
  entry: ["whatwg-fetch", "@babel/polyfill", `${paths.src}/index.js`],
  
  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: ''
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
		      { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, url: false } },
        ]
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
	    template: `${paths.public}/index.html`,
	    inject: 'body'
	  })
  ],
  
  resolve: {
	  extensions: [".js", ".jsx", ".json"],
    modules: [paths.src, paths.modules]
  }
};