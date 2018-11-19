module.exports = api => {
  const testEnv = api.env(envName => envName === "test");

  let envPresetConfig = {
    modules: false,
    useBuiltIns: "entry"
  };

  if (testEnv) {
    envPresetConfig = {
      modules: "commonjs",
      useBuiltIns: "usage",
      targets: {
        node: true
      }
    };
  }

  return {
    plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties", "babel-plugin-lodash"],
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
