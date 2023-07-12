/* eslint-disable no-await-in-loop */
import { execa } from 'execa';
import minimist from 'minimist';
import fs from 'node:fs';
import { cpus } from 'node:os';
import path from 'node:path';
import Log from '../utils/logger.js';

const args = minimist(process.argv.slice(2));
const format = args.format || args.f;

function resolve(...dir) {
  return path.resolve(process.cwd(), ...dir);
}
/**
 * @description 目录下加载所有包
 * @param { string } dir
 * @param { RegExp } regex
 */
function loadPackages(dir, regex = /.*/) {
  if (!dir) return [];

  const pkgDirs = fs.readdirSync(resolve(dir));
  // 剔除不加载的包
  const exludePackages = pkgDirs.filter((p) => regex.test(p));
  // 返回路径
  return exludePackages.filter((p) => fs.lstatSync(resolve(dir, p)));
}
/**
 * @description 多线程打包
 */
async function runParallel(packages, runner, maxConcurrency) {
  const result = [];
  const executing = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const pkg of packages) {
    const p = Promise.resolve().then(() => runner(pkg, format));
    result.push(p);
    if (packages.length > maxConcurrency) {
      const index = executing.indexOf(p);
      const e = p.then(() => executing.splice(index, 1));
      executing.push(e);
      if (executing.length > maxConcurrency) await Promise.race(executing);
    }
  }
  return Promise.all(result);
}

/**
 * @description 构建函数
 */
function build(entry) {
  return execa(
    'rollup',
    ['-c', '--environment', [`ENTRY:${entry}`, `FORMAT:${format}`]],
    { stdio: 'inherit' },
  );
}

/**
 * @description 运行打包
 */
async function run() {
  Log.info('开始打包......\n');
  const packages = loadPackages('packages', /[^dist]/);
  await runParallel(packages, build, cpus.length);
  Log.success('组件打包成功! ');
}
// 执行
run();
