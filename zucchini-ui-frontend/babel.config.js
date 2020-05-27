const package = require("./package.json");

const babelRuntimeVersion = package.dependencies["@babel/runtime"];

module.exports = (api) => {
  const testEnv = api.env((envName) => envName === "test");

  let envPresetConfig = {
    modules: false,
    useBuiltIns: "entry"
  };

  if (testEnv) {
    envPresetConfig = {
      ...envPresetConfig,
      modules: "commonjs",
      useBuiltIns: "usage",
      targets: {
        node: true
      }
    };
  }

  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "babel-plugin-lodash",
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: true,
          corejs: false,
          useESModules: true,
          version: babelRuntimeVersion
        }
      ]
    ],
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          corejs: 3,
          ...envPresetConfig
        }
      ]
    ]
  };
};
