import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/',
  publicPath: 'auto',
  themeConfig: {
    name: 'rcl',
  },
  favicons: [
    // 完整地址
    'http://ui.chenyuhao.com/favicon.ico',
    // 此时将指向 `/favicon.png` ，确保你的项目含有 `public/favicon.png`
    '/favicon.ico',
  ],
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
  headScripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@cyhfe/tracker@0.0.9/dist/tracker.js',
      'data-wid': '16e4b486-fb08-4c4a-847f-0ac5715fcd0d',
    },
  ],
});
