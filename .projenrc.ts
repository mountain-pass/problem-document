import {
  CodeOfConduct,
  GitHubber,
  NpmReleaser,
  Organisational,
  Recommended,
} from "@mountainpass/cool-bits-for-projen";
import { NpmAccess } from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

const gitHubber = new GitHubber({
  name: "problem-document",
  username: "mountain-pass",
});

const npmReleaser = new NpmReleaser(gitHubber, {
  scope: "mountainpass",
  access: NpmAccess.PUBLIC,
  release: true,
});

const organisational = new Organisational({
  organisation: {
    name: "Mountain Pass",
    email: "info@mountain-pass.com.au",
    url: "https://mountain-pass.com.au",
  },
});

const project = new TypeScriptProject({
  ...gitHubber.nodeProjectOptions(),
  ...organisational.nodeProjectOptions(),
  ...npmReleaser.nodeProjectOptions(),
  ...Recommended.defaultProjectOptions,
  description:
    "A basic RFC7807 Problem Details document with basic type checking and autocomplete" /* The description is just a string that helps people understand the purpose of the package. */,
  deps: [] /* Runtime dependencies of this module. */,
  devDeps: [
    "http-status-codes",
    "@types/http-status-codes",
    "@mountainpass/cool-bits-for-projen",
  ] /* Build dependencies for this module. */,
  keywords: ["problem-details", "rfc7807"],
  defaultReleaseBranch: "main",
  projenrcTs: true,
});

const recommended = new Recommended(project, {
  cSpellOptions: { language: "en-GB", ignorePaths: ["docs"] },
});

new CodeOfConduct(
  project,
  { contactMethod: "tom@mountain-pass.com.au" },
  { cSpell: recommended.cSpell }
);

project.synth();
