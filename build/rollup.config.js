const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const json = require('@rollup/plugin-json')
const del = require('rollup-plugin-delete')
const resolvePath = url => path.resolve(__dirname, url)

module.exports = {
  input: resolvePath('../src/index.ts'),
  output: {
    file: resolvePath('../dist/index.js'),
    format: 'cjs'
  },
  plugins: [
    del({
      targets: 'dist/*'
    }),
    typescript({
      exclude: ['node_modules'],
      cwd: resolvePath('../')
    }),
    commonjs(),
    nodeResolve(),
    json()
  ]
}
