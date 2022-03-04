import { IExecOptions } from '../types'
import { exec, runCommand } from '../utils'
import { green } from 'colors'

/**
 * @author lihh
 * @description 执行vite处理
 */
class ViteRun {
  async apply(options: IExecOptions) {
    const { tpl, tool, projectName, rootPath, callback } = options

    // 表示npm版本
    let npmVersion = ''
    if (tool === 'npm') {
      try {
        npmVersion = await exec('npm --version')
        console.log(npmVersion)
      } catch (e) {
        console.log(e)
        process.exit(1)
      }
    }

    // 表示命令参数
    const commandOptions = []
    // 1. 初始化命令
    if (tool === 'npm') {
      commandOptions.push('init', 'vite@latest')
    } else {
      commandOptions.push('create', 'vite')
    }
    // 2. 添加项目名称
    commandOptions.push(projectName)
    // 3. 添加模板名称
    if (tool === 'pnpm' || (tool === 'npm' && npmVersion.startsWith('7'))) {
      commandOptions.push('--')
    }

    // 4. 添加结尾内容
    commandOptions.push('--template', tpl)

    // 执行命令
    await runCommand(tool, commandOptions, { cwd: rootPath })
    console.log(`${green('success')}  1. Vite generated project<${projectName}> successfully `)
    callback && callback()
  }
}

export default new ViteRun()
