import { IExecOptions } from '../types'
import { exec, runCommand, successLog } from '../utils'
import { green } from 'colors'

/**
 * @author lihh
 * @description 执行vite处理
 */
class ViteRun {
  async apply(options: IExecOptions) {
    const { tpl, tool, projectName, rootPath, callback, projectPath } = options

    // 表示npm版本
    let npmVersion = ''
    if (tool === 'npm') {
      try {
        npmVersion = await exec('npm --version')
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

    // 表示其余的插件
    const otherPlugins = []
    if (options.isPinia) otherPlugins.push('pinia', 'pinia-plugin-persist')
    if (options.isVueRouter) otherPlugins.push('vue-router')
    if (otherPlugins.length > 0) {
      await runCommand(tool, ['install'].concat(otherPlugins.concat(['-S'])), { cwd: projectPath })
    }

    successLog(`1. Vite generated project<${projectName}> successfully `)

    // 进行依赖注册
    await runCommand(tool, ['install'], { cwd: projectPath })
    successLog(`2. project<${projectName}> dependencies installed successfully `)

    callback && callback()
  }
}

export default new ViteRun()
