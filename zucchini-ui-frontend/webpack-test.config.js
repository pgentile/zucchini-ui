var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./config.json');


module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /chartist\.js/, // Babel can't load Chartist, it must be excluded
        loaders: [
          'babel?cacheDirectory',
        ],
      },
      {
        test: /\.html$/,
        loaders: [
          'html',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap'),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        loaders: [
          'url?limit=100000',
          'img?minimize',
        ],
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new webpack.DefinePlugin({
      configuration: JSON.stringify(config.ui),
    }),
    new ExtractTextPlugin('[name].css'),
  ]
};
