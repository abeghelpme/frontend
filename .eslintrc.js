module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Add any additional TypeScript-specific ESLint rules or overrides here.

    // TypeScript should be in strict mode (recommended).
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // Enforce consistent spacing before function parentheses.
    'space-before-function-paren': ['error', 'always'],

    // Enforce consistent usage of TypeScript-specific naming conventions.
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'property',
        format: ['camelCase', 'snake_case']
      },
      {
        selector: 'method',
        format: ['camelCase']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ],

    // Disallow unused variables.
    '@typescript-eslint/no-unused-vars': 'error',

    // Require explicit return types on functions and class methods.
    '@typescript-eslint/explicit-function-return-type': 'error',

    // Disallow the use of the 'any' type.
    '@typescript-eslint/no-explicit-any': 'error',

    // Enforce a consistent member ordering (recommended).
    '@typescript-eslint/member-ordering': 'error'
  }
};
