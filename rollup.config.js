import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    sass({
      output(styles) {
        fs.writeFileSync('dist/picky.css', styles);
      }
    }),
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
