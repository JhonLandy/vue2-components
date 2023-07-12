import chalk from 'chalk';
import ora from 'ora';

const spinner = ora({ color: 'blue' });
/**
 * @description 文字一般颜色
 * @param { string } text
 * @return { string }
 */
function tc(text) {
  return chalk.cyan(text);
}
/**
 * @description 操作成功颜色
 * @param { string } text
 * @return { string }
 */
function ts(text) {
  return chalk.green(text);
}
/**
 * @description 操作失败颜色
 * @param { string } text
 * @return { string }
 */
function tf(text) {
  return chalk.red(text);
}
/**
 * @description 操作失败颜色
 * @param { string } text
 * @return { string }
 */
function tw(text) {
  return chalk.yellow(text);
}

/**
 * @description 日志打印
 * @type {{
 * success(msg: string): void
 * info(msg: string): void
 * warn(msg: string): void
 * error(msg: string): void
 * loading(msg: string): void
 * }}
 */
class Log {
  static success(msg) {
    spinner.succeed(ts(msg));
  }

  static info(msg) {
    spinner.info(tc(msg));
  }

  static warn(msg) {
    spinner.warn(tw(msg));
  }

  static error(msg) {
    spinner.fail(tf(msg));
  }

  static loading(msg) {
    spinner.start(tc(msg));
  }
}
export default Log;
