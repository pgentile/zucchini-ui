var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


module.exports = {
  entry: {
      app: [
          './app/scripts/app.js',
          './app/styles/main.css',
      ],
      vendor: [
        'bootstrap/dist/css/bootstrap.css',
        'angular-loading-bar/build/loading-bar.css',
        'chartist/dist/chartist.min.css',
        'bootstrap/dist/js/bootstrap.js',
        'angular',
        "angular-elastic",
        "angular-loading-bar",
        "angular-resource",
        "angular-route",
        "angular-ui-bootstrap",
        "ng-file-upload",
        "pure-uuid",
        'chartist',
        'lodash',
        'jquery',
      ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: [],
            cacheDirectory: true
          }
      },
      {
        test: /app\/.+\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    */
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    */
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new NgAnnotatePlugin({
      add: true,
    }),
  ]
};
