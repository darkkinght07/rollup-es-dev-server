/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

 import babel from 'rollup-plugin-babel';
 import resolve from '@rollup/plugin-node-resolve';
 import { terser } from 'rollup-plugin-terser';
 import filesize from 'rollup-plugin-filesize';
 import minifyHTML from 'rollup-plugin-minify-html-literals';
 import copy from 'rollup-plugin-copy';
 
 const filesizeConfig = {
   showGzippedSize: true,
   showBrotliSize: false,
   showMinifiedSize: false,
 };

 const babelConfig = {
  babelrc: false,
  ...{
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
          },
        },
      ],
    ],
  },
};
 
 const copyConfig = {
   targets: [
     { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
     { src: 'node_modules/systemjs/dist/s.min.js', dest: 'dist/node_modules/systemjs/dist' },
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
       format: 'systemjs',
     },
     plugins: [
       minifyHTML(),
       babel(babelConfig),
       resolve(),
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
 