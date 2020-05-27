module.exports = {
  rootDir: "./src",
  testURL: "http://localhost/",
  transformIgnorePatterns: ["/node_modules/(?!lodash-es)/"],
  coverageDirectory: "../build/coverage",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
