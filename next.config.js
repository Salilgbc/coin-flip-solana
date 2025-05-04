/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  // Environment Variables available at build time
  env: {
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'devnet',
    NEXT_PUBLIC_MIN_BET: process.env.NEXT_PUBLIC_MIN_BET || '1',
    NEXT_PUBLIC_MAX_BET: process.env.NEXT_PUBLIC_MAX_BET || '3',
    NEXT_PUBLIC_WIN_RATE: process.env.NEXT_PUBLIC_WIN_RATE || '35',
  },
  // Headers to allow wallet connection
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Authorization" }
        ],
      },
    ];
  },
  // Webpack configuration for Solana web3
  webpack: (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
      path: false,
      crypto: false,
    };

    return config;
  },
  // Disable x-powered-by header
  poweredByHeader: false,
  // Generate static HTML files
  output: 'standalone',
}

module.exports = nextConfig;
