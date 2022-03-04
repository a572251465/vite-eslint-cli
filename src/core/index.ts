import { IExecOptions } from '../types'
import viteRun from './viteRun'
import gitInitRun from './gitInitRun'
import { successLog } from '../utils'

const execStacks = [viteRun, gitInitRun]
/**
 * @author lihh
 * @description 开始执行命令
 * @param options 通过shell 以及入口 收集的参数
 */
const run = async (options: IExecOptions) => {
  const len = execStacks.length

  // 表示成功的回调
  function success() {
    successLog(`end: Project initialization succeeded`)
  }

  async function next(index: number) {
    const instance = execStacks[index]
    await instance.apply({
      ...options, callback: async () => {
        const currentIndex = index + 1
        if (currentIndex === len) {
          success()
        } else {
          await next(currentIndex)
        }
      }
    })
  }

  await next(0)
}

export default run
