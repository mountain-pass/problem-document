const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'problem-document',
  scripts: {
    prepare: 'husky install',
  },
  deps: [], /* Runtime dependencies of this module. */
  description: 'A basic RFC7807 Problem Document with basic type checking and autocomplete', /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['http-status-codes', '@types/http-status-codes', 'husky', '@commitlint/config-conventional', '@commitlint/cli'], /* Build dependencies for this module. */
  packageName: '@mountain-pass/problem-document', /* The "name" in package.json. */
  npmDistTag: 'latest', /* The npm distribution tag. */
  npmAccess: 'public', /* The npm access level. */
  releaseToNpm: true, /* Whether to release to npm. */
});
project.synth();