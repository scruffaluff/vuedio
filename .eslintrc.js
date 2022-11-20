// ESLint configuration file for linting JavaScript and TypeScript code.
//
// For more information, visit https://eslint.org/docs/user-guide/configuring.

module.exports = {
  env: {
    node: true,
  },
  // The order of the extends plugins affects linter errors.
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["prettier"],
  root: true,
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: false,
        vars: "all",
      },
    ],
  },
};
