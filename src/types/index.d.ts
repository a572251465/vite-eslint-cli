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
