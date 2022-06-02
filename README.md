# problem-document

A basic [RFC7807](https://datatracker.ietf.org/doc/html/rfc7807) Problem Details document with basic type checking and autocomplete

[![License](https://img.shields.io/github/license/mountain-pass/problem-document?logo=apache)](https://github.com/mountain-pass/problem-document/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@mountainpass/problem-document?logo=npm)](https://www.npmjs.com/package/@mountainpass/problem-document) [![npm downloads](https://img.shields.io/npm/dm/@mountainpass/problem-document?logo=npm)](https://www.npmjs.com/package/@mountainpass/problem-document)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmountain-pass%2Fproblem-document.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmountain-pass%2Fproblem-document?ref=badge_shield)

[![Build Status](https://img.shields.io/github/workflow/status/mountain-pass/problem-document/release?logo=github)](https://github.com/mountain-pass/problem-document/actions/workflows/release.yml) [![GitHub issues](https://img.shields.io/github/issues/mountain-pass/problem-document?logo=github)](https://github.com/mountain-pass/problem-document/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/mountain-pass/problem-document?logo=github)](https://github.com/mountain-pass/problem-document/pulls)

<!-- [![Quality](https://img.shields.io/codacy/grade/940768d54f7545f7b42f89b26c23c751?logo=codacy)](https://www.codacy.com/gh/mountain-pass/problem-document/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mountain-pass/problem-document&amp;utm_campaign=Badge_Grade) [![Coverage](https://img.shields.io/codacy/coverage/940768d54f7545f7b42f89b26c23c751?logo=codacy)](https://www.codacy.com/gh/mountain-pass/problem-document/dashboard?utm_source=github.com&utm_medium=referral&utm_content=mountain-pass/problem-document&utm_campaign=Badge_Coverage) -->

[![source code vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/mountain-pass/problem-document?label=source%20code%20vulnerabilities&logo=snyk)](https://snyk.io/test/github/mountain-pass/problem-document) [![npm package vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mountainpass/problem-document@latest?label=npm%20package%20vulnerabilties&logo=snyk)](https://snyk.io/test/npm/@mountainpass/problem-document/latest)


[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

![I love badges](https://img.shields.io/badge/%E2%99%A5%20i%20love-%20badges-green?logo=heart)

<!-- [![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard) -->

## Installation

### npm

run the following command in your project

```sh
npm install @mountainpass/problem-document
```

### yarn

run the following command in your project

```sh
yarn add @mountainpass/problem-document
```

### projen

Add `@mountainpass/problem-document` to your `deps` in your `.projen.js` or `projen.ts`. e.g.

```js
///...
const project = new NodeProject({
    //...
    deps: [
        //...
        '@mountainpass/problem-document'
    ]
});
```

and run `npx projen`

## Usage

```js
import { ProblemDocument } from "@mountainpass/problem-document";

//...
const problemDocument = new ProblemDocument({
    type: "https://example.com/probs/out-of-credit",
    title: "You do not have enough credit.",
    detail: "Your current balance is 30, but that costs 50.",
    instance: "/account/12345/msgs/abc",
    balance: 30,
    accounts: ["/account/12345",
                 "/account/67890"]
  });
```
