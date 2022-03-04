const path = require('path')
const fs = require('fs')
const cp = require('child_process')
import { ICommanderOptions, IPackageInfo, ISpawnOptions } from '../types'

/**
 * @author lihh
 * @description 获取当前文件的配置文件
 */
const getConfigFile = (): IPackageInfo => {
  const readPath = path.resolve(__dirname, '../package.json')
  const content = fs.readFileSync(readPath, 'utf-8')
  return JSON.parse(content) as IPackageInfo
}

/**
 * @author lihh
 * @description 返回一个commander描述信息
 */
const getCommanderOptions = (): ICommanderOptions[] => {
  return [
    {
      keyword: '-tpl, --template <template>',
      description: 'Please enter the template, which is consistent with vite'
    },
    {
      keyword: '-y, --y',
      description: 'Implement default parameters'
    }
  ] as ICommanderOptions[]
}

/**
 * @author lihh
 * @description 要求执行cmd命令
 * @param command 命令名称 npm/ yarn/ pnpm
 * @param args 表示npm等其余的参数 tsc init等
 * @param options spawn 其余参数
 */
const runCommand = (
  command: string,
  args: string[],
  options: ISpawnOptions = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    })

    // fail
    executedCommand.on('error', (error: string | undefined) => {
      reject(new Error(error))
    })

    // success
    executedCommand.on('exit', (code: number, ...args: any) => {
      if (code === 0) {
        resolve('')
      } else {
        reject(new Error(''))
      }
    })
  })

/**
 * @author lihh
 * @description 直接执行的命令
 * @param command
 */
const exec = <T>(command: string, options: ISpawnOptions = {}) => new Promise<T>((resolve, reject) => {
  cp.exec(command, options, (error: string, output: T) => {
    if (error) {
      reject(error)
    } else {
      resolve(output)
    }
  })
})

export {
  getConfigFile,
  getCommanderOptions,
  runCommand,
  exec
}
