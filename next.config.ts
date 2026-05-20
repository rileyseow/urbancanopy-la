import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /url/,
          type: 'asset/resource',
        },
        {
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] },
          use: ['@svgr/webpack'],
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
