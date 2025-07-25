import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    webpackBuildWorker: false, // 기존 설정 있을 경우 병합
    serverActions: false, // 필요 없다면 false
    // 👇 여기서 watchOptions 사용
    webpackDevMiddleware: {
      watchOptions: {
        poll: 1000,
        aggregateTimeout: 300,
      },
    },
  },
};

export default nextConfig;
