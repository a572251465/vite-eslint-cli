const path = require('path')
const { removeSync } = require('fs-extra')

removeSync(path.resolve(__dirname, 'a'))
