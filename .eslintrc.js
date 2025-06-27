module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'security', 'react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'prettier/prettier': 'error'
  }
};
