FROM node:18-alpine AS base

ARG DEFAULT_BACKEND_URL

ARG NEXT_PUBLIC_SIGN_UP_SECRET_KEY

ARG NEXT_PUBLIC_LOGIN_SECRET_KEY

ENV DEFAULT_BACKEND_URL=$DEFAULT_BACKEND_URL

ENV NEXT_PUBLIC_SIGN_UP_SECRET_KEY=$NEXT_PUBLIC_SIGN_UP_SECRET_KEY

ENV NEXT_PUBLIC_LOGIN_SECRET_KEY=$NEXT_PUBLIC_LOGIN_SECRET_KEY

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN rm -rf ./.next/cache

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]