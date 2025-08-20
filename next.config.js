/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cn"],
    defaultLocale: "en",
    domains: [
      {
        domain: "website.com",
        defaultLocale: "en",
      },
      {
        domain: "website.cn",
        defaultLocale: "cn",
      },
    ],
  },
}

module.exports = nextConfig


