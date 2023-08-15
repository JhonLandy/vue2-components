import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import postcss from 'rollup-plugin-postcss';
// import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';
import del from 'rollup-plugin-delete';
import esbuild from 'rollup-plugin-esbuild';
import polyfillNode from 'rollup-plugin-polyfill-node';
import VuePlugin from 'rollup-plugin-vue';
// import { createRequire } from 'node:module'
// eslint-disable-next-line no-underscore-dangle
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// const require = createRequire(import.meta.url)
const packageDir = path.resolve(__dirname, 'packages');
const resolve = (p) => path.resolve(packageDir, p);

// 打包入口
const entry = process.env.ENTRY;
// 模块格式
const format = process.env.FORMAT || 'esm';
// 是否生产环境
const isPro = process.env.NODE_ENV === 'production';
const plugins = [
  VuePlugin({ css: false }),
  del({ targets: resolve(`${entry}/dist/*`) }),
  alias({}),
  nodeResolve(),
  commonJS(),
  esbuild({
    //   tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    sourceMap: !isPro,
    minify: isPro,
    target: 'es2019',
  }),

  polyfillNode(),
  json(),
  postcss({
    minimize: isPro,
    plugins: [autoprefixer],
  }),
];
const output = {
  esm: {
    format: 'esm',
    file: resolve(`${entry}/dist/esm/index.js`),
  },
  cjs: {
    format: 'cjs',
    file: resolve(`${entry}/dist/cjs/index.js`),
  },
  umd: {
    format: 'umd',
    name: 'index.js',
    dir: resolve(`${entry}/dist/umd`),
  },
};
/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: resolve(`${entry}/index.js`),
  output: {
    ...output[format],
    banner: '/* Written by @nuomi */',
  },
  plugins,
};
