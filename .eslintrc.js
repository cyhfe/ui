module.exports = {
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
};
