/** @type {import("prettier").Config} */

module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "cva", "tv"],
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  jsxSingleQuote: false,
};
