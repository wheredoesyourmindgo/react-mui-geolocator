// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  // All the used libs needs to be here
  external: [
    'classnames'
    // 'react',
    // 'prop-types',
    // '@material-ui/core/Button',
    // '@material-ui/core/CircularProgress',
    // '@material-ui/core/colors/green',
    // '@material-ui/core/styles',
    // '@material-ui/icons/GpsFixed'
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**' // Default: undefined
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};
