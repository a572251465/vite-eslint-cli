/**
 * @author lihh
 * @description 进行git初始化
 */
import { IExecOptions } from '../types'
import { runCommand, successLog } from '../utils'

class GitInitRun {
  /**
   * @author lihh
   * @description 表示程序运行的入口
   * @param options 表示传递的参数
   */
  async apply(options: IExecOptions) {
    const { projectPath, callback } = options

    // 执行初始命令
    await runCommand('git', ['init'], { cwd: projectPath })

    successLog(`3. git init successfully`)
    callback && callback()
  }
}

export default new GitInitRun()
