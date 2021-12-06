'use strict';

const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const rollup = require('rollup');
const terserPlugin = require('rollup-plugin-terser');

const fs = require('fs');
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

function generateConfig({dirName, packageJSON}) {
  // Adapted from Redux and Recoil's rollup.config.js.

  // TODO: Specify external dependencies.

  const input = path.resolve(`./packages/${dirName}/src/index.js`);
  return [
    // CommonJS.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/cjs/${dirName}.js`),
        format: 'cjs',
        exports: 'auto',
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // ES modules.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/es/${dirName}.js`),
        format: 'es',
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // ES modules for Browsers.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/es/${dirName}.mjs`),
        format: 'es',
        indent: false,
      },
      plugins: [resolve.default(), ...productionPlugins],
    },
    // UMD development.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/umd/${dirName}.js`),
        format: 'umd',
        name: dirName,
      },
      plugins: [resolve.default(), ...developmentPlugins],
    },
    // UMD production.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/umd/${dirName}.min.js`),
        format: 'umd',
        name: dirName,
        indent: false,
      },
      plugins: [resolve.default(), ...productionPlugins],
    },
    // TODO: Add React Native.
  ];
}

async function build(pkg) {
  await Promise.all(
    generateConfig(pkg).map(async (config) => {
      const bundle = await rollup.rollup(config);
      await bundle.generate(config.output);
      await bundle.write(config.output);
      await bundle.close();
    }),
  );
}

async function buildAll() {
  const packageDirs = fs.readdirSync('packages');
  const packages = packageDirs.map((packageDir) => ({
    dirName: packageDir,
    packageJSON: require(path.resolve(`./packages/${packageDir}/package.json`)),
  }));

  await Promise.all(packages.map(async (pkg) => await build(pkg)));
}

buildAll();
