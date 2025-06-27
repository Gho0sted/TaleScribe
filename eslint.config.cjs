const { FlatCompat } = require('@eslint/eslintrc');

// Adapter for classic shareable configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  // Apply recommended presets via FlatCompat
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      security: require('eslint-plugin-security'),
      prettier: require('eslint-plugin-prettier'),
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
];
