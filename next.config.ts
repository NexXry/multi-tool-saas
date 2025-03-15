import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["tiktok-live-connector"],
  },

  webpack: (config, { isServer }) => {
    // Make webpack ignore .proto files
    config.module.rules.push({
      test: /\.proto$/,
      use: "ignore-loader",
    });

    // Only include polyfills for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    return config;
  },
};

export default nextConfig;
