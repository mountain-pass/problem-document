import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import noSecrets from "eslint-plugin-no-secrets";
import prettier from "eslint-plugin-prettier/recommended";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.ts", "**/*.tsx"];
const jsonFiles = ["**/*.json", "**/*.json5", "**/*.jsonc"];

export default tseslint.config(
  {
    ignores: [
      "**/*.js",
      "**/*.d.ts",
      "node_modules/",
      "**/*.generated.ts",
      "coverage/",
      "dist/",
      "lib/",
      "test-reports/",
    ],
  },
  // TypeScript configs - scoped to TS files
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    ...prettier,
  },
  {
    files: tsFiles,
    ...eslintConfigPrettier,
  },
  {
    files: tsFiles,
    ...unicorn.configs.recommended,
  },
  {
    files: tsFiles,
    ...jsdoc.configs["flat/recommended-typescript"],
  },
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.dev.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "prettier/prettier": "error",
      "@typescript-eslint/no-require-imports": "error",
      "no-duplicate-imports": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "key-spacing": "error",
      "no-multiple-empty-lines": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",
      "no-trailing-spaces": "error",
      "dot-notation": "error",
      "no-bitwise": "error",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "public-static-method",
            "protected-static-field",
            "protected-static-method",
            "private-static-field",
            "private-static-method",
            "field",
            "constructor",
            "method",
          ],
        },
      ],
      "unicorn/prefer-node-protocol": "off",
      "unicorn/expiring-todo-comments": "off",
      "jsdoc/require-jsdoc": [
        "error",
        {
          contexts: [
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
            "TSEnumDeclaration",
            "PropertyDeclaration",
            "ClassProperty",
            "ClassDeclaration",
            "MethodDefinition",
          ],
        },
      ],
      "jsdoc/require-description": [
        "error",
        {
          contexts: ["any"],
        },
      ],
      "jsdoc/check-indentation": "error",
      "jsdoc/check-line-alignment": "error",
      "jsdoc/check-syntax": "error",
      "jsdoc/require-asterisk-prefix": "error",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns-type": "off",
      "no-secrets/no-secrets": "error",
    },
  },
  // JSON configs
  ...jsonc.configs["flat/recommended-with-jsonc"].map((config) => ({
    ...config,
    files: jsonFiles,
  })),
  {
    files: jsonFiles,
    ignores: [
      "package.json",
      "tsconfig.json",
      "tsconfig.dev.json",
    ],
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "no-secrets/no-secrets": "error",
    },
  },
);
