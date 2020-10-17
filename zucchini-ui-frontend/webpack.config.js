const path = require("path");
const { NormalModuleReplacementPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

// Output dir
const outputDir = path.join(__dirname, "build/dist/assets");

// Config
const devServerPort = parseInt(process.env.DEV_SERVER_PORT || 9000);
const apiUrl = process.env.API_URL || "http://localhost:8080";

module.exports = {
  entry: {
    main: "./src/main.jsx"
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".scss", ".css"]
  },
  output: {
    path: outputDir,
    filename: "[name].js",
    publicPath: "/ui/assets/"
  },
  devtool: "source-map",
  devServer: {
    port: devServerPort,
    historyApiFallback: true,
    before: (app) => {
      app.get("/", (req, res) => {
        res.redirect("/ui/");
      });
    },
    proxy: {
      "/api": {
        target: apiUrl
      },
      "/ws": {
        target: apiUrl.replace(/^http/, "ws"),
        ws: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader?cacheDirectory"]
      },
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, "node_modules", "quick-lru")],
        use: ["babel-loader?cacheDirectory"]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          "postcss-loader?sourceMap",
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  node: false,
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin(),

    // Replace lodash-es imports by equivalent lodash imports.
    // Otherwise, same lodash functions can be loaded twice !
    new NormalModuleReplacementPlugin(/lodash-es/, (resource) => {
      resource.request = resource.request.replace("lodash-es", "lodash");
    }),

    new LodashModuleReplacementPlugin(),

    new ESLintPlugin({
      resolvePluginsRelativeTo: __dirname
    })
  ]
};
