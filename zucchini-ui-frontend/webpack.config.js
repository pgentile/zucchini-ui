var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var outputDir = path.join(__dirname, 'build/dist/ui');
var config = require('./config.json');


// Connect function to serve a Javascript configuration file
var javascriptConfigMiddleware = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/javascript'});
  res.end('var configuration = ' + JSON.stringify(config.ui) + ';');
};



module.exports = {
  entry: {
      app: [
        './app/scripts/app.js',
        './app/styles/main.css',
      ],
      vendor: [
        'angular/angular-csp.css',
        'bootstrap/dist/css/bootstrap.css',
        'angular-loading-bar/build/loading-bar.css',
        'chartist/dist/chartist.min.css',
        'bootstrap/dist/js/bootstrap.js',
        'angular',
        'angular-elastic',
        'angular-loading-bar',
        'angular-resource',
        'angular-route',
        'angular-ui-bootstrap',
        'ng-file-upload',
        'pure-uuid',
        'chartist',
        'lodash',
        'jquery',
      ],
  },
  output: {
    path: outputDir,
    filename: '[name].js',
    publicPath: '/ui/'
  },
  devtool: 'source-map',
  devServer: {
    //contentBase: outputDir,
    port: config.devServer.port,
    setup: function(app) {
      app.get('/ui/config.js', javascriptConfigMiddleware);
     },
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel?cacheDirectory',
          'ng-annotate'
        ],
      },
      {
        test: /\.html$/,
        loaders: [
          'html',
          'html-minify'
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss'),
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
  postcss: function () {
    return [autoprefixer, precss];
  },
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  'html-minify-loader': {
    empty: true,
    comments: false,
    conditionals: true,
    loose: true,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([
      {
        from: 'index.html',
      }
    ]),
  ]
};
