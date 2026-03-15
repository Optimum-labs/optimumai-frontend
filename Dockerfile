FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ── Dependencies ──
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build ──
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN pnpm exec prisma generate

# Build Next.js
RUN pnpm build

# ── Production ──
FROM base AS runner
ENV NODE_ENV=production

# Install tsx globally for seed script
RUN npm install -g tsx

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy Prisma files for migrations
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/.pnpm node_modules/.pnpm
COPY --from=builder /app/node_modules/prisma node_modules/prisma
COPY --from=builder /app/node_modules/@prisma node_modules/@prisma
COPY --from=builder /app/node_modules/dotenv node_modules/dotenv
COPY --from=builder /app/lib/generated ./lib/generated

# Copy seed script and entrypoint
COPY --from=builder /app/prisma/seed.ts ./prisma/seed.ts
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# Migrations need write access
RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]
