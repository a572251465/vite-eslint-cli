const path = require('path')
const fs = require('fs')
import { ICommanderOptions, IPackageInfo } from '../types'

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

export {
  getConfigFile,
  getCommanderOptions
}
