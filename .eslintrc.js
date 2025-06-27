module.exports = {
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
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: './tsconfig.json' }
    }
  ]
};
