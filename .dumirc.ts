import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'rcl',
  },
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
});
