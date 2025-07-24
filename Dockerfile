# 1. 빌드 단계 (Builder Stage)
FROM node:18-slim AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 lock 파일 복사
COPY package*.json ./

# 프로덕션 종속성 설치
RUN npm install --production

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build


# 2. 실행 단계 (Runner Stage)
FROM node:18-slim AS runner

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 보안을 위해 non-root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 소스 및 빌드 파일 복사
COPY package*.json ./
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/static ./.next/static

# 프로덕션 종속성 설치
RUN npm install --production

# 사용자 전환
USER nextjs

# 포트 노출
EXPOSE 4030

# 환경 변수 설정
ENV NODE_ENV=production
ENV HOSTNAME 0.0.0.0

# 애플리케이션 실행
CMD ["node", "server.js"]
