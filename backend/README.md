# Wolfrayet API & Admin

Backend service: CMS APIs, contact forms, AI chat, and admin panel.

## Local development

```bash
cd backend
cp .env.example .env.local
# Set DATABASE_URL, ADMIN_USER_ID, ADMIN_PASSWORD
npm install
npm run db:push
npm run db:seed
npm run dev
```

Runs on **http://localhost:3001**. The frontend expects `NEXT_PUBLIC_API_URL=http://localhost:3001`.

## Vercel deployment

1. Create a **new Vercel project** from this repo.
2. Set **Root Directory** to `backend`.
3. Add environment variables:
   - `DATABASE_URL` — PostgreSQL (Neon recommended)
   - `ADMIN_USER_ID` / `ADMIN_PASSWORD` — change defaults
   - `ALLOWED_ORIGINS` — your frontend URL(s), comma-separated
   - `BLOB_READ_WRITE_TOKEN` — enable Vercel Blob for uploads
4. Deploy. Copy the deployment URL into the frontend `NEXT_PUBLIC_API_URL`.

Admin panel: `https://your-api.vercel.app/admin`
