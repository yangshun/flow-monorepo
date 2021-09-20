# Flow Monorepo

Template repository to demonstrate how to set up a monorepo with Flow. Other tools include:

- Babel
- ESLint
- Flow
- Jest
- Lerna
- Prettier
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

- `yarn build` - Runs the `build` command in each directory in `package` via Lerna
- `yarn check-all` - Runs all necessary checks. Useful for CI environments
- `yarn clean` - Removes all the `dist` directories in each package
- `yarn flow` - Checks the `package` directory for Flow violations
- `yarn lint` - Checks the `package` directory for ESLint violations
- `yarn test` - Tests all the files with Jest
- `yarn publish-packages` - Runs Lerna publish
