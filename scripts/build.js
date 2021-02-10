const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))

const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

execa(
  'rollup',
  [
    '-c',
    '--environment',
    [`__DEV__:false`, `DEBUG:false`, `COMMIT:${commit}`].filter(Boolean).join(','),
  ],
  {
    stdio: 'inherit',
  },
)
