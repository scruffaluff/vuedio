/**
 * ESLint configuration file for static code analysis.
 *
 * For more information, visit
 * https://eslint.org/docs/latest/use/configure/configuration-files.
 */

import js from "@eslint/js";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  prettier,
  {
    rules: {
      "no-unused-vars": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [
      ".cache/",
      ".unlighthouse/",
      ".vendor/",
      "build/",
      "coverage/",
      "dist/",
      "tmp/",
    ],
  },
];
