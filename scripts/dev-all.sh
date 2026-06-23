#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KILL_PORT="$ROOT/scripts/kill-port.sh"

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "→ Stopping stale dev servers on ports 3000 & 3001..."
bash "$KILL_PORT" 3000
bash "$KILL_PORT" 3001
sleep 0.5

echo "→ Starting backend on http://localhost:3001"
(
  cd "$ROOT/backend"
  exec npx next dev -p 3001
) &
BACKEND_PID=$!

echo "→ Waiting for backend..."
for i in {1..45}; do
  if curl -sf "http://localhost:3001/api/cms/settings" >/dev/null 2>&1; then
    echo "→ Backend ready"
    break
  fi
  if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "✗ Backend process exited unexpectedly. Check backend/.env.local"
    exit 1
  fi
  sleep 1
  if [[ $i -eq 45 ]]; then
    echo "✗ Backend did not start in time. Check backend/.env.local"
    exit 1
  fi
done

echo "→ Starting frontend on http://localhost:3000"
bash "$KILL_PORT" 3000
cd "$ROOT"
exec npx next dev -p 3000
