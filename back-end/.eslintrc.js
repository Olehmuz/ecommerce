module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['import'],
  extends: ['standard-with-typescript'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    project: './back-end/tsconfig.json',
    ecmaVersion: 'latest'
  },
  rules: {
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off'
  }
}
