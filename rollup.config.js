import path from 'path'
import fse from 'fs-extra'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'

const resolve = (p) => path.resolve(__dirname, p)
const packagePath = resolve('package.json')

const packageInfo = fse.readJSONSync(packagePath)

const isProduction = process.env.__DEV__ === 'false'

export default {
  input: resolve('src/index.ts'),
  output: {
    sourcemap: !!process.env.SOURCE_MAP,
    file: resolve('lib/index.js'),
    format: 'commonjs',
    exports: 'auto',
  },
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    commonjs(),
    nodeResolve(),
    replace({
      __DEV__: !isProduction,
    }),
    ...(isProduction ? [filesize()] : []),
  ],
  external: Object.keys(packageInfo.dependencies || {}),
}
