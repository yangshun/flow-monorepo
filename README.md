# Node.js + Flow Boilerplate

## How to use

Install dependencies:

```
$ yarn
```

## Commands

- `yarn dev` - Runs `index.js` from the `src` files with `babel-node` which compiles the code in memory.
- `yarn start` - Alias for `yarn dev`.
- `yarn flow` - Runs Flow for the files in `src`.
- `yarn build` - Compiles `src` using Babel with `NODE_ENV=production` into `lib`.
- `yarn start:prod` - Compiles `src` using Babel into `lib` and runs `index.js` from the `lib` files.
