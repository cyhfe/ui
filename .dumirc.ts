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
});
