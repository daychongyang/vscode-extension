const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))

const sourcemap = args.sourcemap || args.s
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [`__DEV__:true`, `COMMIT:${commit}`, `SOURCE_MAP:${sourcemap}`].filter(Boolean).join(','),
  ],
  {
    stdio: 'inherit',
  },
)
