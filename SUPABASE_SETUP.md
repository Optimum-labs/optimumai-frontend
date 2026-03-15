# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: OptimumAI
   - Database Password: Choose a strong password
   - Region: Select closest to your users

## 2. Get Project Credentials

After project creation, go to Settings > API:

- **Project URL**: Copy this
- **anon public key**: Copy this
- **service_role key**: Copy this (keep secret!)

## 3. Update Environment Variables

Update your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (from Supabase Dashboard > Settings > Database)
DATABASE_URL=postgresql://postgres:[password]@db.your-project-id.supabase.co:5432/postgres
```

## 4. Enable Email Auth

In Supabase Dashboard:
1. Go to Authentication > Settings
2. Configure email templates if needed
3. Enable email confirmations

## 5. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations on Supabase
npx prisma db push

# Seed the database
npx tsx prisma/seed.ts
```

## 6. Test the App

```bash
pnpm dev
```

Visit http://localhost:3000 and test signup/login.

## 7. Deploy to Vercel

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Notes

- Supabase handles user authentication automatically
- User data is synced to your custom User table via the `getCurrentUser` function
- The dashboard shows enrolled courses and activity from your database
- Email verification is handled by Supabase