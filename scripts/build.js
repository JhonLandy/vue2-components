import { execa } from "execa"
import minimist from "minimist"
import fs from "node:fs"
import { cpus } from "node:os"
import path from "node:path"
import Log from "../utils/logger.js"

const args = minimist(process.argv.slice(2))
const format = args.format || args.f
// 执行
run()

function resolve(...dir) {
  return path.resolve(process.cwd(), ...dir)
}
/**
 * @description 目录下加载所有包
 * @param { string } dir
 * @param { RegExp } regex
 */
function loadPackages(dir, regex = /.*/) {
  if (!dir) return []

  const context = fs.readdirSync(resolve(dir))
  // 剔除不加载的包
  const exludePackages = context.filter(p => regex.test(p))
  // 返回路径
  return exludePackages.filter(p => fs.lstatSync(resolve(dir, p)))
}
/**
 * @description 多线程打包
 */
async function runParallel(packages, runner, maxConcurrency) {
  const result = []
  const executing = []

  for (const pkg of packages) {
    const p = Promise.resolve().then(() => runner(pkg, "esm"))
    result.push(p)

    if (packages.length > maxConcurrency) {
      const index = executing.indexOf(p)
      const e = p.then(() => executing.splice(index, 1))
      executing.push(e)
      if (executing.length > maxConcurrency) await Promise.race(executing)
    }
  }
  return Promise.all(result)
}
/**
 * @description 运行打包
 */
async function run() {
  Log.info("开始打包......\n")
  const packages = loadPackages("packages", /[^dist]/)
  await runParallel(packages, build, cpus.length)
  Log.success("组件打包成功! ")
}

/**
 * @description 构建函数
 */
function build(entry) {
  return execa(
    "rollup",
    ["-c", "--environment", [`ENTRY:${entry}`, `FORMAT:${format}`]],
    { stdio: "inherit" }
  )
}
