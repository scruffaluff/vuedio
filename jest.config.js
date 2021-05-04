// Jest configuration file for testing JavaScript and TypeScript code.
//
// For more information, visit https://jestjs.io/docs/configuration.

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{ts,vue}",
    "!**/node_modules/**",
    "!tests/e2e/**",
  ],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["./tests/setup.ts"],
};
