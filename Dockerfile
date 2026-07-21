FROM node:24-alpine AS builder

WORKDIR /app

# We proxy the requests through npm-remote instead of directly accessing npm
RUN npm config set registry https://artifactory/artifactory/api/npm/npm-remote
# Set scoped registry for @miaop
RUN npm config set @miaop:registry https://artifactory/artifactory/api/npm/miaop-npm-local
# Disable certificates check because we trust our own registry
RUN npm config set strict-ssl false

COPY package*.json ./
COPY eslint.config.mjs nest-cli.json package*.json tsconfig*.json ./
COPY src src/

RUN npm clean-install --include=dev \
    && npm run build \
    && rm -f dist/tsconfig.prod.tsbuildinfo \
    && npm clean-install --omit=dev

FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules node_modules/

EXPOSE 3000

CMD ["node", "dist/main"]
