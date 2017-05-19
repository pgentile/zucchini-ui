const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// Output dir
const outputDir = path.join(__dirname, 'build/dist/assets');


// Load packages names
const packageContent = require('./package.json');
const vendorLibs = Object.keys(packageContent.dependencies);


// Config
const config = require('./config.json');

// Connect function to serve a Javascript configuration file
const javascriptConfigMiddleware = function (req, res) {
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
      'chartist/dist/chartist.min.css',
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
    path: outputDir,
    filename: 'ui/assets/[name].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    port: config.devServer.port,
    setup: function (app) {
      app.get('/ui/assets/config.js', javascriptConfigMiddleware);
    },
  },
  externals: {
    'configuration': 'configuration',
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
        exclude: /chartist\.js/, // Babel can't load Chartist, it must be excluded
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
    new ExtractTextPlugin('ui/assets/[name].css'),
  ],
};
