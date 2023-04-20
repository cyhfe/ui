import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/',
  publicPath: 'react-component-library/',
  themeConfig: {
    name: 'rcl',
  },
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
});
