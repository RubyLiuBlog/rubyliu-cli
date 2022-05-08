import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/bin/cli.js',
  output: { 
    file: './build/bin/cli.js',    // 必须
    format:  'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',  // Default: undefined
      ignoreGlobal: false,  // Default: false
      sourceMap: false,  // Default: true
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
};
