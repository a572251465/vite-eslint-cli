<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="http://lihh-core.top/images/logo.png" alt="Vite logo" />
  </a>
</p>
<br/>

# vite-eslint-cli

> 基于vite + vue3/ vite + react等 实现eslint prettier部署，内置vite vue3运行方式。执行代码构建以及eslint部署一体

- 💡 基于vite 实现了项目以及规范一体化部署
- ⚡️可以从0 到 1快速部署
- 🛠️ 内置实现vue3/ ts/ eslint/ prettier/ commitlint/ husky/ pinia持久化/ vue-router
- 📦 可以快速实现从代码以及规范的搭建

## 与vite vue3的不同

- 使用vite 创建vue3 + ts项目只会出现一个简单模板, 需要手动`npm install`, 以及配置基本插件以及规范，例如：pinia, eslint等
- vite-eslint-cli 能做什么？？？
    - 💡 内置vite 创建方式，和单独使用vite没有什么不同
    - ⚡️ 内置了eslint规范，例如：prettier, eslint, commitlint, husky
    - 🛠️ 提供了vue3 的全家桶配置。例如: pinia, pinia-plugin-persist, vue-router
    - 📦 提供了pinia 持久化方案
    - 🔩 内置了vue-router以及pinia 案例
    - 🔑 可以用--template 参数 来替代vite --template参数

## 支持范围

| 功能                                           | 是否支持                                                                                                      |
| ------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| vue3 + ts                    | 支持                                   |
| vue3 + js | 待支持             |
| react + ts | 待支持 |
| react + js   | 待支持 |

## 使用

> $ npx vite-eslint-cli myapp
> <br/>
> $ npx vite-eslint-cli myapp --template vue-ts

## 注意

- 默认版本就是vue3 + ts

## QA

- 如果你是高手
    - 使用插件可以免去你配置规范的步骤，快速开发业务代码
- 如果你是新手
    - 让你从0 到1快速实现项目，内置“全家桶” 案例能够快速学习
