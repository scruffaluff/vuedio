// ESLint configuration file for linting JavaScript and TypeScript code.
//
// For more information, visit https://eslint.org/docs/user-guide/configuring.

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:tailwindcss/recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:vuejs-accessibility/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
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
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-expect-error": "allow-with-description" },
    ],
    "vue/attributes-order": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "vuejs-accessibility/interactive-supports-focus": "off",
  },
};
