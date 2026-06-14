# syntax=docker/dockerfile:1.7
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

# Build-time placeholders — Railway injects real values at runtime
# NEXT_PUBLIC_* vars are inlined at build time so set the real value
# in Railway dashboard as a build-time variable
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PAYLOAD_SECRET=build-placeholder-32-char-secret!! \
    DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder \
    NEXT_PUBLIC_SERVER_URL=https://zovaorganics.com \
    R2_PUBLIC_URL=https://media.zovaorganics.com \
    R2_BUCKET=placeholder \
    R2_ENDPOINT=https://placeholder.r2.cloudflarestorage.com \
    R2_ACCESS_KEY_ID=placeholder \
    R2_SECRET_ACCESS_KEY=placeholder

RUN pnpm run build

# ── Runner ────────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

# Combine apk, addgroup, adduser into one layer
RUN apk add --no-cache libc6-compat \
    && addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nextjs

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Public assets (no chown needed — read-only at runtime)
COPY --from=builder /app/public ./public

# Standalone output — includes server.js + all SSR chunks + proxy
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Static files must be copied separately after standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Full server dir — proxy manifest, route chunks, middleware
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server

# Payload migrations needed at container start
COPY --from=builder --chown=nextjs:nodejs /app/src/migrations ./src/migrations

# Fix ownership of .next dir created by standalone copy
RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

# JSON form so SIGTERM goes directly to node, not a shell
CMD ["node", "server.js"]



error log

dockerfile invalid: flag '--mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store' is missing the cacheKey prefix from its id at Line 15
