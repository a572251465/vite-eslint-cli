import { IExecOptions } from '../types'
import viteRun from './viteRun'

const execStacks = [viteRun]
/**
 * @author lihh
 * @description 开始执行命令
 * @param options 通过shell 以及入口 收集的参数
 */
const run = async (options: IExecOptions) => {
  const len = execStacks.length

  // 表示成功的回调
  function success() {
    console.log('执行成功')
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
