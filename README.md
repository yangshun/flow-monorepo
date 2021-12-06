# Flow Monorepo

Template repository to demonstrate how to set up a monorepo with Flow. Other tools include:

- Babel
- ESLint
- Flow
- Jest
- Lerna
- Prettier
- Rollup
- Terser
- Yarn

## Getting started

Install dependencies

```sh
$ yarn
```

Rename package scope. Search for `@yangshun` in the repository and make the following changes:

1. Update import statements in `packages`
1. Update the Jest/Flow config mapping in `jest.config.js` and `.flowconfig`

## Directory structure

```
├── packages
│   ├── bar
│   │   ├── __tests__
│   │   │   └── bar.test.js
│   │   ├── src
│   │   │   └── index.js
│   │   └── package.json
│   └── foo
│       ├── __tests__
│       │   └── foo.test.js
│       ├── src
│       │   └── index.js
│       └── package.json
└── package.json
```

## Commands

- `yarn build` - Runs rollup on all packages to build bundles for each environment
- `yarn check-all` - Runs all necessary checks. Useful for CI environments
- `yarn clean` - Removes all the rollup bundle directories in each package
- `yarn flow` - Checks the `packages` directory for Flow violations
- `yarn prettier` - Formats all the files in all the JS files
- `yarn prettier:report` - Reports any formatting violations in all the JS files
- `yarn publish-packages` - Runs Lerna publish
- `yarn lint` - Fixes the ESLint violations in all the JS files
- `yarn lint:report` - Reports ESLint violations in all the JS files
- `yarn test` - Tests all the files with Jest
