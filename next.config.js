// eslint-disable-next-line
const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: true,
};
// eslint-disable-next-line
module.exports = million.next(nextConfig, millionConfig);
