'use strict';

const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const rollup = require('rollup');

const fs = require('fs');
const path = require('path');

function generateConfig({dirName, packageJSON}) {
  // Adapted from Redux's rollup.config.js.

  const input = path.resolve(`./packages/${dirName}/src/index.js`);
  return [
    // CommonJS.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/cjs/${dirName}.js`),
        format: 'cjs',
        exports: 'auto',
        indent: false,
      },
      plugins: [resolve.default(), babel.default({babelHelpers: 'runtime'})],
    },
    // ES modules.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/es/${dirName}.js`),
        format: 'es',
        indent: false,
      },
      plugins: [resolve.default(), babel.default({babelHelpers: 'runtime'})],
    },
    // ES modules for Browsers.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/es/${dirName}.mjs`),
        format: 'es',
        indent: false,
      },
      plugins: [
        resolve.default(),
        babel.default({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
        }),
        // TODO: Add replace and terser.
      ],
    },
    // UMD development.
    {
      input,
      output: {
        file: path.resolve(`./packages/${dirName}/umd/${dirName}.js`),
        format: 'umd',
        name: dirName,
        indent: false,
      },
      plugins: [resolve.default(), babel.default({babelHelpers: 'bundled'})],
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
      plugins: [
        resolve.default(),
        babel.default({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
        }),
        // TODO: Add replace and terser.
      ],
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
