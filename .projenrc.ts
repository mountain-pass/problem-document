import { MountainPassTypeScriptProject } from "@mountainpass/projen-typescript-library";
// import { typescript, JsonFile, TextFile } = require("projen");

const project = new MountainPassTypeScriptProject({
  name: "problem-document",
  deps: [] /* Runtime dependencies of this module. */,
  description:
    "A basic RFC7807 Problem Details document with basic type checking and autocomplete" /* The description is just a string that helps people understand the purpose of the package. */,
  devDeps: [
    "http-status-codes",
    "@types/http-status-codes",
    "@mountainpass/projen-typescript-library",
    // "typedoc@^0.22.15"
    // "eslint-config-standard": "^16.0.2",
    // "eslint-plugin-chai-friendly": "^0.7.1",
    // "eslint-plugin-eslint-comments": "^3.2.0",
    // "eslint-plugin-import": "^2.22.1",
    // "eslint-plugin-istanbul": "^0.1.2",
    // "eslint-plugin-json": "^3.0.0",
    // "eslint-plugin-markdown": "^2.1.0",
    // "eslint-plugin-md": "^1.0.19",
    // "eslint-plugin-node": "^11.1.0",
    // "eslint-plugin-promise": "^5.1.0",
    // "eslint-plugin-security": "^1.4.0",
  ] /* Build dependencies for this module. */,
  keywords: ["problem-details", "rfc7807"],
});

project.addContributors("Tom Howard <tom@mountainpass.com.au>");

project.synth();
