module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint .", "eslint", "npm run format"],
  "**/*.ts?(x)": () => "npm run check-types",
  "*.{json,yaml}": ["prettier --write"],
};
