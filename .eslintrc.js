const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['fbjs', 'prettier', 'plugin:react-hooks/recommended'],
  // Stop ESLint from looking for a configuration file in parent folders.
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['flowtype', 'react', 'jest'],
};
