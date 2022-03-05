/**
 * @author lihh
 * @description 表示prettier处理
 */
import { IEslintrc, IExecOptions } from '../types'
import getDependentPlugins from '../utils/plugins'
import { copyFile, joinPath, resolvePath, runCommand, successLog, warningLog } from '../utils'

const fs = require('fs')

class PrettierRun {
  /**
   * @author lihh
   * @description 表示功能插件的运行入口
   * @param options 参数
   */
  async apply(options: IExecOptions) {
    const { projectPath, callback, tpl, tool } = options
    const flags = `prettier-${tpl}`

    // 获取插件
    const plugins = getDependentPlugins(flags)
    if (plugins.length === 0) {
      warningLog(`该脚手架暂时不支持<${flags}>, 后续逐渐支持，请持续关注. 但是vite创建的项目已经可以使用`)
      callback && callback('end')
      return
    }

    // 开始注册插件
    await runCommand(tool, ['install'].concat(plugins).concat(['-D']), { cwd: projectPath })

    // 开始复制文件
    const basePath = resolvePath('./template')
    const fileArr = ['.prettierrc.js', '.prettierignore']
    fileArr.forEach(fileName => {
      copyFile(joinPath(basePath, fileName), joinPath(projectPath, fileName))
    })

    // 开始读取.eslintrc.js 进行文件修改
    const fileDir = joinPath(projectPath, '.eslintrc.js')
    const eslintrcConfig = require(fileDir) as IEslintrc
    eslintrcConfig.extends!.push('prettier')
    if (tpl.startsWith('vue')) eslintrcConfig.extends!.push('@vue/eslint-config-prettier')
    // 开始写文件
    fs.writeFileSync(fileDir, `module.exports = ${JSON.stringify(eslintrcConfig, null, '  ')}`, { encoding: 'utf-8' })

    successLog('5. prettier configuration succeeded')
    callback && callback()
  }
}

export default new PrettierRun()
