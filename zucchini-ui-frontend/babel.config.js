const pkg = require("./package.json");

const babelRuntimeVersion = pkg.dependencies["@babel/runtime"];

module.exports = (api) => {
  const testEnv = api.env("test");
  const productionEnv = api.env("production");

  let envPresetConfig = {
    modules: "auto",
    useBuiltIns: "entry"
  };

  if (testEnv) {
    envPresetConfig = {
      ...envPresetConfig,
      useBuiltIns: "usage",
      targets: {
        node: true
      }
    };
  }

  return {
    plugins: [
      "babel-plugin-lodash",
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: true,
          corejs: false,
          version: babelRuntimeVersion
        }
      ]
    ],
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          development: !productionEnv
        }
      ],
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
