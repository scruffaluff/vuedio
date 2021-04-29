// ESLint configuration file for linting JavaScript and TypeScript code.
//
// For more information, visit https://eslint.org/docs/user-guide/configuring.

module.exports = {
  env: {
    node: true,
  },
  extends: [
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "@vue/typescript/recommended",
    "eslint:recommended",
    "plugin:vue/essential",
  ],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["prettier"],
  root: true,
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
