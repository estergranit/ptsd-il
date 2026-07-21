FROM node:24-alpine AS builder

WORKDIR /app

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
