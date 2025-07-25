/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from 'next';

const path = require('path');
const dotenv = require('dotenv');

// 현재 환경에 따라 적절한 .env 파일 경로를 설정합니다.
const envPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, 'config/.env.production')
    : path.resolve(__dirname, 'config/.env.development'); // 개발 환경용 파일 (선택 사항)

// 해당 경로의 .env 파일을 로드합니다.
dotenv.config({ path: envPath });

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone' //운영환경시 사용
};

export default nextConfig;
