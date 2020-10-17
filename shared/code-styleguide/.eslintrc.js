const prettier = require('./.prettierrc.js')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['prettier', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'prettier/prettier': ['error', { ...prettier }]
  }
}
