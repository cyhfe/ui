import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/',
  publicPath: 'auto',
  themeConfig: {
    name: 'rcl',
  },
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
});
