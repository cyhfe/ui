module.exports = {
  rules: {
    'guard-for-in': 'off',
    'react/button-has-type': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'no-use-before-define': ['error', { functions: false, classes: false }],
  },
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    'plugin:react-hooks/recommended',
  ],
};
