FROM node:22.17.0-alpine AS base

# ── Deps ──────────────────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

COPY package.json pnpm-lock.yaml ./
COPY .npmrc* ./

RUN pnpm install --frozen-lockfile

# ── Builder ───────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time placeholders so next build never throws on missing env vars.
# Railway injects real values at runtime via the Variables tab.
ENV PAYLOAD_SECRET=build-placeholder-32-char-secret!!
ENV DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder
ENV NEXT_PUBLIC_SERVER_URL=https://zovaorganics.com
ENV R2_PUBLIC_URL=https://media.zovaorganics.com
ENV R2_BUCKET=placeholder
ENV R2_ENDPOINT=https://placeholder.r2.cloudflarestorage.com
ENV R2_ACCESS_KEY_ID=placeholder
ENV R2_SECRET_ACCESS_KEY=placeholder

RUN pnpm run build

# ── Runner ────────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Static assets
COPY --from=builder /app/public ./public

# Standalone build output (requires output: 'standalone' in next.config.ts)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# Payload migration files needed at runtime
COPY --from=builder --chown=nextjs:nodejs /app/src/migrations ./src/migrations

RUN mkdir -p .next && chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]