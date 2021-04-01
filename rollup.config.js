import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const filesizeConfig = {
  showGzippedSize: true,
  showBrotliSize: false,
  showMinifiedSize: false,
};

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
    { src: 'images', dest: 'dist' },
    { src: 'data', dest: 'dist' },
    { src: 'index-for-dist.html', dest: 'dist', rename: 'index.html' },
  ],
};

const configs = [
  {
    input: ['src/app.js'],
    output: {
      file: 'dist/app-ie.js',
      format: 'iife',
    },
    plugins: [
      minifyHTML(),
      babel({babelHelpers: "bundled"}),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      copy(copyConfig)
    ],
    preserveEntrySignatures: false,
  },
  {
    input: ['src/app.js'],
    output: {
      file: 'dist/app-modern.js',
      format: 'iife',
    },
    plugins: [
      minifyHTML(),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      copy(copyConfig)
    ],
    preserveEntrySignatures: false,
  }
];

for (const config of configs) {
  if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
  }
  config.plugins.push(filesize(filesizeConfig));
}

export default configs;
