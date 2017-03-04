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
        use: [
          'babel-loader?cacheDirectory',
        ],
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        use: [
          'url-loader?limit=100000',
          'img-loader?minimize',
        ],
      }
    ]
  },
  plugins: [
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
