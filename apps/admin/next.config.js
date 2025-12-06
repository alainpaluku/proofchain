/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@proofchain/ui', '@proofchain/chain'],
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
  },
};

module.exports = nextConfig;
