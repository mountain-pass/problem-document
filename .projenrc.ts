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
    "dry-aged-deps",
  ] /* Build dependencies for this module. */,
  keywords: ["problem-details", "rfc7807"],
  defaultReleaseBranch: "main",
  projenrcTs: true,
  dependabotOptions: {
    labels: ["auto-approve"],
  },
  jestOptions: {
    jestConfig: {
      coverageThreshold: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["dependabot[bot]"],
    label: "auto-approve",
    secret: "GITHUB_TOKEN",
  },
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
        ],
      },
    },
  },
});

const recommended = new Recommended(project, {
  cSpellOptions: {
    language: "en-GB",
    ignorePaths: ["docs", ".dry-aged-deps.json"],
  },
});

// Add dry-aged-deps check to the pre-push hook
recommended.husky.addHook("pre-push", "npx dry-aged-deps --check");

new CodeOfConduct(project, { contactMethod: "tom@mountain-pass.com.au" });

// Fix npm pack command for newer npm versions
const packageTask = project.tasks.tryFind("package")!;
packageTask.reset();
packageTask.exec("mkdir -p dist/js");
packageTask.exec("npm pack --pack-destination dist/js");

// Add dry-aged-deps check to the build workflow
project.buildWorkflow?.addPostBuildSteps({
  name: "Check for outdated dependencies",
  run: "npx dry-aged-deps --check",
});

// Upgrade deprecated GitHub Actions from v2/v3 to v4
const buildWorkflow = project.github?.tryFindWorkflow("build");
if (buildWorkflow?.file) {
  buildWorkflow.file.addOverride(
    "jobs.build.steps.0.uses",
    "actions/checkout@v4"
  );
  buildWorkflow.file.addOverride(
    "jobs.build.steps.5.uses",
    "actions/upload-artifact@v4"
  );
  buildWorkflow.file.addOverride(
    "jobs.self-mutation.steps.0.uses",
    "actions/checkout@v4"
  );
  buildWorkflow.file.addOverride(
    "jobs.self-mutation.steps.1.uses",
    "actions/download-artifact@v4"
  );
}

const releaseWorkflow = project.github?.tryFindWorkflow("release");
if (releaseWorkflow?.file) {
  releaseWorkflow.file.addOverride(
    "jobs.release.steps.0.uses",
    "actions/checkout@v4"
  );
  releaseWorkflow.file.addOverride(
    "jobs.release.steps.5.uses",
    "actions/upload-artifact@v4"
  );
  releaseWorkflow.file.addOverride(
    "jobs.release_github.steps.0.uses",
    "actions/setup-node@v4"
  );
  releaseWorkflow.file.addOverride(
    "jobs.release_github.steps.1.uses",
    "actions/download-artifact@v4"
  );
  releaseWorkflow.file.addOverride(
    "jobs.release_npm.steps.0.uses",
    "actions/setup-node@v4"
  );
  releaseWorkflow.file.addOverride(
    "jobs.release_npm.steps.1.uses",
    "actions/download-artifact@v4"
  );
}

const upgradeWorkflow = project.github?.tryFindWorkflow("upgrade-main");
if (upgradeWorkflow?.file) {
  upgradeWorkflow.file.addOverride(
    "jobs.upgrade.steps.0.uses",
    "actions/checkout@v4"
  );
  upgradeWorkflow.file.addOverride(
    "jobs.upgrade.steps.4.uses",
    "actions/upload-artifact@v4"
  );
  upgradeWorkflow.file.addOverride(
    "jobs.pr.steps.0.uses",
    "actions/checkout@v4"
  );
  upgradeWorkflow.file.addOverride(
    "jobs.pr.steps.1.uses",
    "actions/download-artifact@v4"
  );
}

gitHubber.addToProject(project);
npmReleaser.addToProject(project);
organisational.addToProject(project);

project.synth();
