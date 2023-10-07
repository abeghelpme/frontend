module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // tells parser relative path of tsconfig.json
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    '@typescript-eslint',
    '@next/eslint-plugin-next', // https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/lib/index.js
    'sonarjs', // sonarjs plugin for eslint
  ],

  // all configs (eslint-config-xxx) go here:
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // contains rules that specifically require type information
    'plugin:@next/next/recommended',
    'next', // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json
    'next/core-web-vitals',
  ],
  rules: {
    // Add any additional TypeScript-specific ESLint rules or overrides here.

    // TypeScript should be in strict mode (recommended).
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // Disallow unused variables.
    '@typescript-eslint/no-unused-vars': 'error',

    // Disallow the use of the 'any' type.
    '@typescript-eslint/no-explicit-any': 'error',

    // Enforce a consistent member ordering (recommended).
    '@typescript-eslint/member-ordering': 'error',

    // Enforce a maximum cyclomatic complexity of 10
    complexity: ['error', 10],

    // Enforce rules to detect and prevent overly complex code
    'sonarjs/cognitive-complexity': ['error', 10],
  },
};
