module.exports = {
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
};
