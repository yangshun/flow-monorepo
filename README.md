# Flow Monorepo

Template repository to demonstrate how to set up a monorepo with Flow. Other tools include:

- Babel
- Flow
- Jest
- Lerna
- Prettier
- Yarn

## Install

```sh
$ yarn
```

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

- `yarn test` - Tests all the files with Jest
- `yarn build` - Runs the `build` command in each directory in `package` via Lerna
- `yarn publish-packages` - Runs Lerna publish
