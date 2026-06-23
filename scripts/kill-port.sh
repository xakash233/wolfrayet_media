#!/usr/bin/env bash
# Free a TCP port (macOS/Linux). Exits 1 if still busy after retries.
set -euo pipefail

PORT="${1:?Usage: kill-port.sh <port>}"
MAX_TRIES="${2:-12}"

for ((i = 1; i <= MAX_TRIES; i++)); do
  PIDS="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -z "$PIDS" ]]; then
    exit 0
  fi
  echo "→ Freeing port $PORT (attempt $i/$MAX_TRIES)..."
  # shellcheck disable=SC2086
  kill -9 $PIDS 2>/dev/null || true
  sleep 0.4
done

echo "✗ Port $PORT is still in use. Run: lsof -tiTCP:$PORT -sTCP:LISTEN"
exit 1
