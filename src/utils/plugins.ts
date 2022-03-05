/**
 * @author lihh
 * @description 可以选择的插件市场 将来是要做版本匹配的
 */

const allPlugins: Record<string, string> = {
  'eslint-vue-ts': 'eslint, eslint-plugin-vue, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, @vue/eslint-config-typescript',
  'prettier-vue-ts': 'prettier, eslint-plugin-prettier, @vue/eslint-config-prettier'
}

/**
 * @author lihh
 * @description 用来匹配版本是否存在
 * @param plugins 需要匹配的插件
 */
const matchingVersion = (plugins: string[]) => plugins

/**
 * @author lihh
 * @description 根据key 获取对应的插件
 * @param key
 */
const getDependentPlugins = (key: string): string[] => {
  const values = allPlugins[key] || ''
  const plugins = values === '' ? [] : matchingVersion(values.split(', '))
  return plugins
}


export default getDependentPlugins
