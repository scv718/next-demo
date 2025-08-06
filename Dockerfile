# 1. 빌드 단계
FROM node:22-bookworm-slim AS builder

WORKDIR /usr/src/app

# ✅ 의존성 캐시를 위해 package.json과 lock 파일만 먼저 복사
COPY package.json package-lock.json ./

# ✅ 전체 의존성 설치 (개발용 포함)
RUN npm install

# ✅ 이후에 소스 코드 복사 → 이 부분에서만 캐시 깨지게 함
COPY . .

# ✅ 빌드 수행
RUN npm run build


# 2. 실행 단계
FROM node:22-bookworm-slim AS runner

WORKDIR /usr/src/app

# 보안 사용자 생성
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ✅ 의존성 설치용 파일만 복사 (이 순서도 중요!)
COPY package.json package-lock.json ./

# ✅ production 모드로 의존성 설치 (캐시 잘 작동함)
RUN npm install --omit=dev --ignore-scripts --no-audit

# ✅ 빌드된 파일들만 복사
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 4030
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
