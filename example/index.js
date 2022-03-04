const cp = require('child_process')

cp.exec('npm --version', (error, output) => {
  console.log(error, output)
})
