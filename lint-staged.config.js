module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint .', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,yaml}': ['prettier --write'],
};
