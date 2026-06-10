#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "→ Stopping stale dev servers on ports 3000 & 3001..."
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
lsof -ti :3001 | xargs kill -9 2>/dev/null || true
sleep 1

echo "→ Starting backend on http://localhost:3001"
(cd "$ROOT/backend" && npm run dev) &
BACKEND_PID=$!

echo "→ Waiting for backend..."
for i in {1..30}; do
  if curl -sf "http://localhost:3001/api/cms/settings" >/dev/null 2>&1; then
    echo "→ Backend ready"
    break
  fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    echo "✗ Backend did not start in time. Check backend/.env.local"
    exit 1
  fi
done

echo "→ Starting frontend on http://localhost:3000"
cd "$ROOT" && npm run dev
