const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// Load packages names
const packageContent = require('./package.json');
const vendorLibs = Object.keys(packageContent.dependencies);


// Configuration (TODO externalize config)
const config = {
  ui: {
    backendBaseUri: "http://localhost:8080",
  },
};


// Connect function to serve a Javascript configuration file
var javascriptConfigMiddleware = function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  res.end('var configuration = ' + JSON.stringify(config.ui) + ';');
};


module.exports = {
  entry: {
    app: [
      './src/main.js',
      './src/main.less',
    ],
    vendor: [
      'bootstrap/dist/css/bootstrap.css',
      'bootstrap/dist/js/bootstrap.js',
      ...vendorLibs,
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      'jquery': 'jquery/src/jquery',
    },
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: outputDir,
    // port: config.devServer.port,
    setup: function (app) {
      app.get('/ui-react/config.js', javascriptConfigMiddleware);
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [
          'eslint-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader?cacheDirectory',
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
            'less-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        use: [
          'url-loader?limit=100000',
        ],
      },
    ],
  },
  plugins: [
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'fetch': 'isomorphic-fetch',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
};
