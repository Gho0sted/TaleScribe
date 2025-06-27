const { FlatCompat } = require('@eslint/eslintrc');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const securityPlugin = require('eslint-plugin-security');
const prettierPlugin = require('eslint-plugin-prettier');

const compat = new FlatCompat();

module.exports = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended'
  ),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      security: securityPlugin,
      prettier: prettierPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
];
