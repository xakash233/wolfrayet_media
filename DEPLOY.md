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
3. Environment variables (optional — `vercel.json` already sets defaults):

```
NEXT_PUBLIC_SITE_URL=https://www.wolfrayetmedia.in
NEXT_PUBLIC_API_URL=https://backend-wolf-ten.vercel.app
BACKEND_URL=https://backend-wolf-ten.vercel.app
```

4. Deploy. The frontend proxies `/api/*` and `/admin` to the backend automatically.

**Required on backend only:** `DATABASE_URL`, `ADMIN_PASSWORD`, and optionally `BLOB_READ_WRITE_TOKEN` for uploads. Schema + seed run automatically on Vercel deploy when `DATABASE_URL` is set.

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

**Production:** `https://wolfrayetmedia.in/admin` (proxied from frontend to backend).

**Direct backend URL** also works: `https://your-api.vercel.app/admin`

Backend env (required for proxied admin + server actions):

```
ALLOWED_ORIGINS=https://wolfrayetmedia.in,https://www.wolfrayetmedia.in
NEXT_PUBLIC_FRONTEND_URL=https://wolfrayetmedia.in
```

Frontend env:

```
NEXT_PUBLIC_API_URL=https://your-api.vercel.app
```

Redeploy **both** projects after changing these.
