var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
				loader: "style-loader!css-loader?module=true&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
				exclude: /semantic/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};

module.exports = config;
