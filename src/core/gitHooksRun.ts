/**
 * @author lihh
 * @description git hook执行过程
 */
import { IExecOptions } from '../types'
import { copyFile, joinPath, resolvePath, runCommand, successLog } from '../utils'

const fs = require('fs')

class GitHooksRun {
  /**
   * @author lihh
   * @description git hook项目入口
   * @param options
   */
  async apply(options: IExecOptions) {
    const { projectPath, tool, callback } = options

    // 开始注册执行插件
    await runCommand('npx', ['husky', 'install'], { cwd: projectPath })
    await runCommand(tool, ['install', 'husky', 'lint-staged', '-D'], { cwd: projectPath })

    // 读取package配置文件 修改内容
    try {
      const packagePath = joinPath(projectPath, 'package.json')
      const packageInfo = require(packagePath)
      const scripts = (packageInfo.scripts || (packageInfo.scripts = {}))
      scripts.lint = 'eslint --ext .ts,.tsx,.vue,.js,.jsx src/** --no-error-on-unmatched-pattern --quiet'
      scripts['lint:fix'] = 'eslint --ext .ts,.tsx,.vue,.js,.jsx src/** --no-error-on-unmatched-pattern --quiet --fix'
      scripts.prepare = 'husky install'

      packageInfo['lint-staged'] = {
        '*.{ts,vue,tsx,js,jsx}': 'eslint --cache --fix'
      }
      // 开始重新写文件
      fs.writeFileSync(packagePath, JSON.stringify(packageInfo, null, '  '))

      // 安装commitlint插件
      await runCommand(tool, ['install', '@commitlint/cli', '@commitlint/config-conventional', '-D'], { cwd: projectPath })

      // 开始复制commitlint文件
      const basePath = resolvePath('./template')
      copyFile(joinPath(basePath, 'commitlint.config.js'), joinPath(projectPath, 'commitlint.config.js'))
      copyFile(joinPath(basePath, '.husky'), joinPath(projectPath, '.husky'))

      successLog('6. commitlint configuration succeeded')
      callback && callback()
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  }
}

export default new GitHooksRun()
