# 1. 빌드 단계 (Builder Stage)
FROM node:22-bookworm-slim AS builder

WORKDIR /usr/src/app

# 패키지 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 복사 및 빌드
COPY . .
RUN npm run build


# 2. 실행 단계 (Runner Stage)
FROM node:22-bookworm-slim AS runner

WORKDIR /usr/src/app

# 보안을 위해 non-root 사용자 생성
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 소스 및 빌드 파일 복사
COPY package*.json ./
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/static ./.next/static

# production 의존성만 설치
RUN npm install --omit=dev --ignore-scripts --no-audit

# 사용자 권한 전환
USER nextjs

# 포트 및 환경 변수
EXPOSE 4030
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# 앱 실행
CMD ["node", "server.js"]
