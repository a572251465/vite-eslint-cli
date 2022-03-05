import { IExecOptions } from '../types'
import viteRun from './viteRun'
import gitInitRun from './gitInitRun'
import { successLog } from '../utils'
import eslintRun from './eslintRun'
import prettierRun from './prettierRun'
import gitHooksRun from './gitHooksRun'
import startupProjectRun from './startupProjectRun'

const execStacks = [viteRun, gitInitRun, eslintRun, prettierRun, gitHooksRun]
/**
 * @author lihh
 * @description 开始执行命令
 * @param options 通过shell 以及入口 收集的参数
 */
const run = async (options: IExecOptions) => {
  const len = execStacks.length

  // 表示成功的回调
  async function success() {
    successLog(`end: Project initialization succeeded`)

    // 启动后置钩子
    await startupProjectRun.apply(options)
  }

  async function next(index: number) {
    const instance = execStacks[index]
    await instance.apply({
      ...options, callback: async (flags?: string) => {
        const currentIndex = index + 1
        // 如果flags存在值 表示cli中途中断
        if (currentIndex === len || (flags && flags === 'end')) {
          await success()
        } else {
          await next(currentIndex)
        }
      }
    })
  }

  await next(0)
}

export default run
