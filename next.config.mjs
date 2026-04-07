/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tell Next.js not to bundle these — use native Node.js require() instead.
    // pdf-parse v2 and mammoth use Node internals that break when webpack processes them.
    serverComponentsExternalPackages: ["pdf-parse", "mammoth"],
  },
};

export default nextConfig;
