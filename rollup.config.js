import babel from 'rollup-plugin-babel'
export default {
  input: './src/bin/cli.js',
  output: { 
    file: './build/cli.js',    // 必须
    format:  'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [babel({
    exclude: 'node_modules/**'
  })],
};
