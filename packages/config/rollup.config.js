const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const terserPlugin = require('rollup-plugin-terser');

const path = require('path');

const developmentPlugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  babel.default({babelHelpers: 'bundled'}),
];

const productionPlugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  babel.default({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  terserPlugin.terser({
    mangle: false,
  }),
];

function generateConfig(outputName) {
  // Adapted from Redux and Recoil's rollup.config.js.

  // TODO: Specify external dependencies.

  const pkg = require(path.resolve('./package.json'));
  const input = path.resolve(`./src/index.js`);
  return [
    // CommonJS.
    {
      input,
      output: {
        file: path.resolve(pkg.main),
        format: 'cjs',
        exports: 'auto',
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // ES modules.
    {
      input,
      output: {
        file: path.resolve(pkg.module),
        format: 'es',
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // ES modules for Browsers.
    {
      input,
      output: {
        file: path.resolve(pkg.module).replace('.js', '.mjs'),
        format: 'es',
        indent: false,
      },
      plugins: [resolve.default(), ...productionPlugins],
    },
    // UMD development.
    {
      input,
      output: {
        file: path.resolve(pkg.unpkg),
        format: 'umd',
        name: path.basename(pkg.unpkg, path.extname(pkg.unpkg)),
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // UMD production.
    {
      input,
      output: {
        file: path.resolve(pkg.unpkg).replace('.js', '.min.js'),
        format: 'umd',
        name: path.basename(pkg.unpkg, path.extname(pkg.unpkg)),
        indent: false,
      },
      plugins: [resolve.default(), ...productionPlugins],
    },
    // TODO: Add React Native.
  ];
}

module.exports = generateConfig;
