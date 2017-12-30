import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import sass from 'rollup-plugin-sass';
import jsx from 'rollup-plugin-jsx';
import fs from 'fs';
const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: ['react', 'prop-types', 'react-dom'],
  plugins: [
    sass({
      output(styles) {
        fs.writeFileSync('dist/picky.css', styles);
      }
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    jsx({ factory: 'React.createElement' }),
    commonjs(),
    isProd && uglify()
  ]
};
