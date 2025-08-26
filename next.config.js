/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
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
};

module.exports = nextConfig;
