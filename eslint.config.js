const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.config({
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:security/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', 'security', '@typescript-eslint'],
    settings: { react: { version: 'detect' } },
    rules: {
      'no-console': 'warn'
    }
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json' }
    }
  }
];
