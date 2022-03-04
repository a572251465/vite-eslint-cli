/**
 * @author lihh
 * @description 执行commander入口
 */

import { Command } from 'commander'
import { getCommanderOptions, getConfigFile } from './utils'
import { ICmdOptions } from './types'

const program = new Command()
const configInfo = getConfigFile()
const commanderOptions = getCommanderOptions()

program
  .name(configInfo.name)
  .description(configInfo.description)
  .version(configInfo.version)

program.argument('<project-name>', 'Please enter the project name ')

commanderOptions.forEach(item => {
  program.option(item.keyword, item.description)
})

program.action((projectName: string) => {
  const params = program.opts() as ICmdOptions

  // 是否快速创建
  const isY = params.y || false
  // 表示使用模板
  const tpl = isY ? 'vue-ts' : params.template || 'vue-ts'

  console.log({ isY, tpl, projectName })
})

program.parse()
