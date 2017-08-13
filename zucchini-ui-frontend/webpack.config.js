const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Output dir
const outputDir = path.join(__dirname, 'build/dist/assets');


// Config
const config = require('./config.json');

// Connect function to serve a Javascript configuration file
const javascriptConfigMiddleware = function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  res.end(`var configuration = ${JSON.stringify(config.ui)};`);
};


module.exports = {
  entry: {
    app: [
      './src/main.js',
      './src/main.less',
    ],
    vendor: [
      'bootstrap/dist/css/bootstrap.css',
      'chartist/dist/chartist.min.css',
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  output: {
    path: outputDir,
    filename: '[name].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    port: config.devServer.port,
    publicPath: '/ui/assets',
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
            'postcss-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
            'postcss-loader?sourceMap',
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

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',

      // All dependencies in the vendor file
      minChunks: function (module) {
        return module.context && module.context.includes('node_modules');
      }

    }),

    new webpack.ProvidePlugin({
      'fetch': 'isomorphic-fetch',
    }),

    new ExtractTextPlugin('[name].css'),

    // Don't import all locales from moment.js
    // See https://webpack.js.org/plugins/context-replacement-plugin/
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/)
  ],
};
