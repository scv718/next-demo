FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# 빌드 결과만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 4030
CMD ["npm", "start"]
