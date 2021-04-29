// ESLint configuration file for linting JavaScript and TypeScript code.
//
// For more information, visit https://eslint.org/docs/user-guide/configuring.

module.exports = {
  env: {
    "cypress/globals": true,
    mocha: true,
  },
  plugins: ["cypress"],
};
