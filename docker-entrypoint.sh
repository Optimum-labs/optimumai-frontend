#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx tsx prisma/seed.ts || echo "Seed may already exist, continuing..."

echo "Starting Next.js..."
exec node server.js
