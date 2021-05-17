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
    "@vue/prettier/@typescript-eslint",
  ],
  overrides: [
    {
      env: {
        "cypress/globals": true,
        mocha: true,
      },
      files: ["cypress/**/*.{j,t}s?(x)"],
    },
    {
      env: {
        jest: true,
      },
      files: ["tests/**/*.{j,t}s?(x)"],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["cypress", "prettier"],
  root: true,
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
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
