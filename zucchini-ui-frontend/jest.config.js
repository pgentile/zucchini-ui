const path = require("path");

module.exports = {
  roots: ["./src"],
  transformIgnorePatterns: ["/node_modules/(?!lodash-es)/"],
  coverageDirectory: "../build/coverage",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: path.join(__dirname, "test-results"),
        outputName: "TEST-jest.xml"
      }
    ]
  ]
};
