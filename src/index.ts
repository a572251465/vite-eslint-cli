/**
 * @author lihh
 * @description 执行commander入口
 */

import { Command } from 'commander'
import { getCommanderOptions, getConfigFile } from './utils'
import { ICmdOptions, IExecOptions } from './types'
import prompts from 'prompts'
import run from './core'

/**
 * @author lihh
 * @description 表示闻讯函数
 * @param tpl 表示模板
 */
const promptHandle = async (tpl: string) => {
  let baseOptions = [{
    type: 'select',
    name: 'tool',
    message: 'please select a running tool',
    choices: ['npm', 'yarn', 'pnpm'].map(item => ({ title: item, value: item }))
  }] as prompts.PromptObject[]

  // 判断是否选择vue模板
  if (tpl.includes('vue')) {
    baseOptions = baseOptions.concat([{
      type: 'confirm',
      name: 'isPinia',
      message: 'Need to support Pinia?'
    }, {
      type: 'confirm',
      name: 'isVueRouter',
      message: 'Need to support vue-router?'
    }] as prompts.PromptObject[])
  }

  const res = await prompts(baseOptions)

  return res
}

const program = new Command()
// 获取package 文件配置信息
const configInfo = getConfigFile()
// 获取commander options 配置信息
const commanderOptions = getCommanderOptions()

program
  .name(configInfo.name)
  .description(configInfo.description)
  .version(configInfo.version)

program.argument('<project-name>', 'Please enter the project name ')

commanderOptions.forEach(item => {
  program.option(item.keyword, item.description)
})

program.action(async (projectName: string) => {
  const params = program.opts() as ICmdOptions

  // 是否快速创建
  const isY = params.y || false
  // 表示使用模板
  const tpl = isY ? 'vue-ts' : params.template || 'vue-ts'

  // 选择执行工具
  const tool = await promptHandle(tpl)
  const rootPath = process.cwd()
  const options = { tpl, ...tool, rootPath, projectName } as IExecOptions

  // 开始运行命令
  await run(options)
})

program.parse()
