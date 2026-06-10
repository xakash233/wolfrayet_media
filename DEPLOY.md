# Vercel deployment (frontend + backend)

This repo has two deployable apps:

| App | Root directory | Port (local) | Purpose |
|-----|----------------|--------------|---------|
| **Frontend** | `.` (repo root) | 3000 | Public marketing site |
| **Backend** | `backend` | 3001 | API, CMS, admin panel |

## 1. Deploy backend first

1. [Vercel](https://vercel.com) → **Add New Project** → import this repo.
2. **Root Directory** → `backend`
3. Environment variables:

```
DATABASE_URL=postgresql://...
ADMIN_USER_ID=admin
ADMIN_PASSWORD=<strong-secret>
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.yourdomain.com
BLOB_READ_WRITE_TOKEN=<from Vercel Storage → Blob>
```

4. Deploy and note the URL, e.g. `https://wolfrayet-api.vercel.app`

5. Run database setup (once):

```bash
cd backend
DATABASE_URL="..." npm run db:push
DATABASE_URL="..." npm run db:seed
```

Or use Neon SQL console / Prisma migrate in CI.

## 2. Deploy frontend

1. **Add New Project** (same repo, different Vercel project).
2. **Root Directory** → `.` (leave empty / root)
3. Environment variables:

```
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
NEXT_PUBLIC_API_URL=https://wolfrayet-api.vercel.app
```

4. Deploy.

## 3. Local development

**Easiest — one command (starts both servers):**

```bash
npm run dev:all
```

Frontend: **http://localhost:3000** · Backend/API: **http://localhost:3001** · Admin: **http://localhost:3001/admin**

Or run separately:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev
```

The frontend proxies `/api/*` to the backend in development, so CMS and forms work without CORS issues.

Frontend `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Backend `backend/.env.local`:

```
DATABASE_URL=postgresql://...
ADMIN_USER_ID=admin
ADMIN_PASSWORD=...
ALLOWED_ORIGINS=http://localhost:3000
```

## Admin access

Open **backend** URL → `/admin` (not the frontend site).
