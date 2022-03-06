/**
 * @author lihh
 * @description 需要执行的eslint命令处理
 */
import { IExecOptions } from '../types'
import getDependentPlugins from '../utils/plugins'
import {
  copyFile,
  joinPath,
  resolvePath,
  runCommand,
  successLog,
  warningLog
} from '../utils'

class EslintRun {
  /**
   * @author lihh
   * @description 命令执行的入口
   * @param options 通过外界以及shell收集的参数
   */
  async apply(options: IExecOptions) {
    const { tpl, callback, tool, projectPath } = options
    const flags = `eslint-${tpl}`

    // 获取可以执行的模板
    const plugins = getDependentPlugins(flags)
    if (plugins.length === 0) {
      warningLog(
        `该脚手架暂时不支持<${flags}>, 后续逐渐支持，请持续关注. 但是vite创建的项目已经可以使用`
      )
      callback && callback('end')
      return
    }

    // 执行command命令
    await runCommand(
      tool,
      [tool === 'yarn' ? 'add' : 'install'].concat(plugins).concat(['-D']),
      { cwd: projectPath }
    )
    // 复制配置文件
    const basePath = resolvePath('./template')

    // 开始复制文件
    copyFile(
      joinPath(basePath, '.eslintignore'),
      joinPath(projectPath, '.eslintignore')
    )
    copyFile(joinPath(basePath, `language-template/${flags}`), projectPath)

    successLog('4. eslint configuration succeeded')
    callback && callback()
  }
}

export default new EslintRun()
