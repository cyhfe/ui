import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: 'react-component-library/',
  publicPath: '/',
  themeConfig: {
    name: 'rcl',
  },
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
});
