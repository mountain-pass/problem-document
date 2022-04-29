const { typescript } = require("projen");

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "problem-document",
  scripts: {
    prepare: "husky install",
  },
  deps: [] /* Runtime dependencies of this module. */,
  description:
    "A basic RFC7807 Problem Document with basic type checking and autocomplete" /* The description is just a string that helps people understand the purpose of the package. */,
  devDeps: [
    "http-status-codes",
    "@types/http-status-codes",
    "husky",
    "@commitlint/config-conventional",
    "@commitlint/cli",
    // "eslint-config-standard": "^16.0.2",
    // "eslint-plugin-chai-friendly": "^0.7.1",
    // "eslint-plugin-eslint-comments": "^3.2.0",
    // "eslint-plugin-import": "^2.22.1",
    // "eslint-plugin-istanbul": "^0.1.2",
    "eslint-plugin-jsdoc",
    "eslint-plugin-jsdoc-typescript",
    // "eslint-plugin-json": "^3.0.0",
    // "eslint-plugin-markdown": "^2.1.0",
    // "eslint-plugin-md": "^1.0.19",
    // "eslint-plugin-node": "^11.1.0",
    // "eslint-plugin-prettier": "npm:@rxts/eslint-plugin-prettier@^3.4.0-1",
    // "eslint-plugin-promise": "^5.1.0",
    // "eslint-plugin-security": "^1.4.0",
    "eslint-plugin-unicorn",
  ] /* Build dependencies for this module. */,
  packageName:
    "@mountainpass/problem-document" /* The "name" in package.json. */,
  npmDistTag: "latest" /* The npm distribution tag. */,
  npmAccess: "public" /* The npm access level. */,
  releaseToNpm: true /* Whether to release to npm. */,
  license: "Apache-2.0" /* The license of the package. */,
  repository: "https://github.com/mountain-pass/problem-document",
  codeCov: true,
  dependabot: true,
  prettier: true,
  // prettierOptions: {
  //   settings: {
  //     ...require("prettier-config-standard"),
  //   },
  // },
  docgen: true,
  eslint: true,
  projectType: "library",
  authorEmail: "Mountain Pass <info@mountain-pass.com.au>",
  authorName: "Mountain Pass",
  authorOrganization: "Mountain Pass",
  authorUrl: "https://mountain-pass.com.au",
  bugsUrl: "https://github.com/mountain-pass/problem-document/issues",
  homepage: "https://github.com/mountain-pass/problem-document",
  keywords: ["problem", "document", "rfc7807"],
});

project.eslint.addPlugins("unicorn");
project.eslint.addExtends("plugin:unicorn/recommended");
project.eslint.addOverride({
  files: "*.js",
  rules: { "unicorn/prefer-module": "off" },
});
project.eslint.addPlugins("jsdoc");
project.eslint.addExtends("plugin:jsdoc/recommended");
project.eslint.addRules({
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
  "jsdoc/require-description": ["error", { contexts: ["any"] }],
  "jsdoc/check-indentation": "error",
  "jsdoc/check-line-alignment": "error",
  "jsdoc/check-syntax": "error",
  "jsdoc/require-asterisk-prefix": "error",
  "jsdoc/require-param-type": "off", // TypeScript already has parameter types
});
// these needs to be last
project.eslint.addExtends("prettier");

project.synth();
