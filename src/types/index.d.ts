export interface IPackageInfo {
  name: string,
  version: string,
  description: string,
  author: string
}

export interface ICmdOptions {
  y?: boolean,
  template?: string
}

export interface ICommanderOptions {
  keyword: string,
  description: string
}

export interface IExecOptions {
  tpl: string,
  projectName: string,
  tool: string,
  isPinia: boolean,
  isVueRouter: boolean,
  rootPath: string,
  projectPath: string
  callback?: (...argv: any) => any
}

interface ISpawnOptions {
  cwd?: string
  env?: object
  argv0?: string
  stdio?: string
  detach?: boolean
  uid?: number
  gid?: number
  shell?: boolean | string
  timeout?: number
}

